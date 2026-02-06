// ============================================================================
// CareerCare — API Route : Analyse CV
// POST /api/cv/analyze
// ============================================================================
//
// Pipeline complet :
// 1. Récupère le PDF depuis Storage
// 2. Extrait le texte (pdf-parse)
// 3. Anonymise via Mistral (EU)
// 4. Analyse via DeepSeek (texte anonymisé)
// 5. Stocke le résultat
// 6. Retourne le rapport (avec dé-anonymisation si user connecté)
//
// Temps estimé : 15-30 secondes
//
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient, createSupabaseServerClient } from '@/lib/supabase/server';
import { extractTextFromDocument } from '@/lib/document-extractor';
import { anonymizeCV, deanonymizeResults } from '@/lib/ai/anonymizer';
import { analyzeCV } from '@/lib/ai/cv-analyzer';
import type { CVReport } from '@/types/cv';

export const maxDuration = 60; // Vercel Pro : 60s max

interface AnalyzeRequestBody {
  analysisId: string;
}

// Types temporaires
type CVAnalysis = {
  id: string
  user_id?: string | null
  status: string
  file_name?: string
  file_path: string
  [key: string]: unknown
}

type Subscription = {
  plan: string
  [key: string]: unknown
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Valider la requête
    const body = (await request.json()) as AnalyzeRequestBody;
    const { analysisId } = body;

    if (!analysisId) {
      return NextResponse.json(
        { error: 'analysisId est requis.' },
        { status: 400 }
      );
    }

    const admin = createSupabaseAdminClient();

    // 2. Récupérer l'analyse en base
    const { data: analysis, error: fetchError } = await admin
      .from('cv_analyses')
      .select('*')
      .eq('id', analysisId)
      .single() as { data: CVAnalysis | null; error: unknown };

    if (fetchError || !analysis) {
      return NextResponse.json(
        { error: 'Analyse non trouvée.' },
        { status: 404 }
      );
    }

    if (analysis.status === 'done') {
      // Déjà analysé — retourner le résultat existant
      const { data: existingResult } = await admin
        .from('cv_results')
        .select('*')
        .eq('analysis_id', analysisId)
        .single() as { data: any; error: unknown };

      if (existingResult) {
        return NextResponse.json({
          report: buildReport(analysis, existingResult),
          cached: true,
        });
      }
    }

    if (
      analysis.status !== 'pending' &&
      analysis.status !== 'error'
    ) {
      return NextResponse.json(
        { error: `Analyse en cours (statut: ${analysis.status}). Veuillez patienter.` },
        { status: 409 }
      );
    }

    // 3. Télécharger le PDF depuis Storage
    await updateStatus(admin, analysisId, 'extracting');

    const { data: fileData, error: downloadError } = await admin.storage
      .from('cv-uploads')
      .download(analysis.file_path);

    if (downloadError || !fileData) {
      await updateStatus(admin, analysisId, 'error');
      return NextResponse.json(
        { error: 'Impossible de récupérer le fichier PDF.' },
        { status: 500 }
      );
    }

    // 4. Extraire le texte
    const buffer = Buffer.from(await fileData.arrayBuffer());
    let extraction;

    try {
      extraction = await extractTextFromDocument(buffer, analysis.file_name || undefined);
    } catch (error) {
      await updateStatus(admin, analysisId, 'error');
      return NextResponse.json(
        {
          error: error instanceof Error
            ? error.message
            : 'Erreur lors de l\'extraction du texte.',
        },
        { status: 422 }
      );
    }

    // Sauvegarder le texte brut
    await (admin as any)
      .from('cv_analyses')
      .update({ raw_text: extraction.text, status: 'anonymizing' })
      .eq('id', analysisId);

    // 5. Anonymiser via Mistral (EU)
    console.log(`[Pipeline] Anonymisation pour ${analysisId}...`);
    let anonymization;

    try {
      anonymization = await anonymizeCV(extraction.text);
    } catch (error) {
      console.error('[Pipeline] Anonymization failed:', error);
      await updateStatus(admin, analysisId, 'error');
      return NextResponse.json(
        { error: 'Erreur lors de l\'anonymisation. Veuillez réessayer.' },
        { status: 500 }
      );
    }

    // Sauvegarder le texte anonymisé + la map (EU only)
    await (admin as any)
      .from('cv_analyses')
      .update({
        anonymized_text: anonymization.anonymizedText,
        anonymization_map: anonymization.map,
        status: 'analyzing',
      })
      .eq('id', analysisId);

    // 6. Analyser via DeepSeek (texte anonymisé uniquement)
    console.log(`[Pipeline] Analyse pour ${analysisId}...`);
    let analysisResult;

    try {
      analysisResult = await analyzeCV(anonymization.anonymizedText);
    } catch (error) {
      console.error('[Pipeline] Analysis failed:', error);
      await updateStatus(admin, analysisId, 'error');
      return NextResponse.json(
        { error: 'Erreur lors de l\'analyse. Veuillez réessayer.' },
        { status: 500 }
      );
    }

    // 7. Dé-anonymiser les résultats
    await updateStatus(admin, analysisId, 'deanonymizing');

    const deanonymizedResult = deanonymizeResults(
      analysisResult,
      anonymization.map
    );

    // 8. Stocker le résultat
    const { data: savedResult, error: saveError } = await (admin as any)
      .from('cv_results')
      .insert({
        analysis_id: analysisId,
        score_global: deanonymizedResult.scores.global,
        scores: deanonymizedResult.scores,
        diagnostic: deanonymizedResult.diagnostic,
        forces: deanonymizedResult.forces,
        faiblesses: deanonymizedResult.faiblesses,
        recommandations: deanonymizedResult.recommandations,
        raw_response: deanonymizedResult,
      })
      .select('*')
      .single() as { data: any; error: unknown };

    if (saveError) {
      console.error('[Pipeline] Save result error:', saveError);
      // Ne pas fail — le résultat est en mémoire, on le retourne quand même
    }

    // 9. Marquer comme terminé
    await updateStatus(admin, analysisId, 'done');

    // 10. Incrémenter le compteur si user connecté
    if (analysis.user_id) {
      try {
        await (admin as any).rpc('increment_analyses_count', {
          p_user_id: analysis.user_id,
        }) as { data: any; error: unknown };
      } catch (error) {
        // Ignore errors on increment - non-bloquant
        console.warn('[Pipeline] Failed to increment analyses count:', error);
      }
    }

    const elapsed = Date.now() - startTime;
    console.log(`[Pipeline] Terminé pour ${analysisId} en ${elapsed}ms`);

    // 11. Déterminer si l'user voit le rapport complet ou partiel
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    let isPartial = true; // Par défaut, rapport partiel (hook gratuit)

    if (user) {
      const { data: subscription } = await admin
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user.id)
        .single() as { data: Subscription | null; error: unknown };

      isPartial = !subscription || subscription.plan === 'free'
        ? false  // Free users voient le rapport complet pour la 1ère analyse
        : false; // Pro/Business voient toujours le rapport complet
    }

    // Construire le rapport
    const report: CVReport = {
      id: analysisId,
      fileName: analysis.file_name || 'CV.pdf',
      scores: deanonymizedResult.scores,
      diagnostic: deanonymizedResult.diagnostic,
      forces: deanonymizedResult.forces,
      faiblesses: deanonymizedResult.faiblesses,
      recommandations: deanonymizedResult.recommandations,
      resumeOptimise: deanonymizedResult.resumeOptimise,
      motsClesManquants: deanonymizedResult.motsClesManquants,
      compatibiliteATS: deanonymizedResult.compatibiliteATS,
      createdAt: new Date().toISOString(),
      isPartial,
    };

    return NextResponse.json({ report, cached: false });
  } catch (error) {
    console.error('[Pipeline] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}

// ============================================================================
// Helpers
// ============================================================================

async function updateStatus(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  analysisId: string,
  status: string
) {
  await (admin as any)
    .from('cv_analyses')
    .update({ status })
    .eq('id', analysisId);
}

function buildReport(
  analysis: Record<string, unknown>,
  result: Record<string, unknown>
): CVReport {
  return {
    id: analysis.id as string,
    fileName: (analysis.file_name as string) || 'CV.pdf',
    scores: result.scores as CVReport['scores'],
    diagnostic: result.diagnostic as CVReport['diagnostic'],
    forces: result.forces as string[],
    faiblesses: result.faiblesses as string[],
    recommandations: result.recommandations as CVReport['recommandations'],
    resumeOptimise: (result.raw_response as Record<string, unknown>)?.resumeOptimise as string | undefined,
    motsClesManquants: (result.raw_response as Record<string, unknown>)?.motsClesManquants as string[] | undefined,
    compatibiliteATS: (result.raw_response as Record<string, unknown>)?.compatibiliteATS as number || 50,
    createdAt: result.created_at as string,
    isPartial: false,
  };
}
