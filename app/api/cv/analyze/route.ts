// ============================================================================
// CareerCare — API Route : Analyse IA
// POST /api/cv/analyze
// ============================================================================
//
// Étape 3/3 du pipeline :
// 1. Lit anonymized_text + anonymization_map depuis la base
// 2. Analyse via DeepSeek
// 3. Dé-anonymise les résultats
// 4. Sauvegarde dans cv_results
// 5. Met le statut à 'done'
//
// Temps estimé : ~5-8s
//
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient, createSupabaseServerClient } from '@/lib/supabase/server';
import { analyzeCV } from '@/lib/ai/cv-analyzer';
import { deanonymizeResults } from '@/lib/ai/anonymizer';
import type { CVReport } from '@/types/cv';

export const maxDuration = 25;

interface AnalyzeRequestBody {
  analysisId: string;
}

type CVAnalysis = {
  id: string
  user_id?: string | null
  status: string
  file_name?: string
  anonymized_text?: string | null
  anonymization_map?: Record<string, string> | null
  [key: string]: unknown
}

type Subscription = {
  plan: string
  [key: string]: unknown
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;
    const { analysisId } = body;

    if (!analysisId) {
      return NextResponse.json(
        { error: 'analysisId est requis.' },
        { status: 400 }
      );
    }

    const admin = createSupabaseAdminClient();

    // 1. Récupérer l'analyse
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

    // Vérifier si déjà terminé
    if (analysis.status === 'done') {
      const { data: existingResult } = await admin
        .from('cv_results')
        .select('*')
        .eq('analysis_id', analysisId)
        .single() as { data: any; error: unknown };

      if (existingResult) {
        return NextResponse.json({
          status: 'done',
          report: buildReport(analysis, existingResult),
          cached: true,
        });
      }
    }

    if (!analysis.anonymized_text) {
      return NextResponse.json(
        { error: 'Le texte anonymisé n\'a pas encore été créé. Appelez /api/cv/anonymize d\'abord.' },
        { status: 400 }
      );
    }

    // 2. Analyser via DeepSeek
    console.log(`[Analyze] Analyzing for ${analysisId}...`);
    await updateStatus(admin, analysisId, 'analyzing');

    let analysisResult;

    try {
      analysisResult = await analyzeCV(analysis.anonymized_text);
    } catch (error) {
      console.error('[Analyze] DeepSeek error:', error);
      await updateStatus(admin, analysisId, 'error');
      return NextResponse.json(
        { error: 'Erreur lors de l\'analyse. Veuillez réessayer.' },
        { status: 500 }
      );
    }

    // 3. Dé-anonymiser les résultats
    const deanonymizedResult = deanonymizeResults(
      analysisResult,
      analysis.anonymization_map || {}
    );

    // 4. Stocker le résultat
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
      console.error('[Analyze] Save result error:', saveError);
    }

    // 5. Marquer comme terminé
    await updateStatus(admin, analysisId, 'done');

    // 6. Incrémenter le compteur si user connecté
    if (analysis.user_id) {
      try {
        await (admin as any).rpc('increment_analyses_count', {
          p_user_id: analysis.user_id,
        }) as { data: any; error: unknown };
      } catch (error) {
        console.warn('[Analyze] Failed to increment analyses count:', error);
      }
    }

    console.log(`[Analyze] ✅ Done for ${analysisId}`);

    // 7. Déterminer si rapport partiel ou complet
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    let isPartial = true;

    if (user) {
      const { data: subscription } = await admin
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user.id)
        .single() as { data: Subscription | null; error: unknown };

      isPartial = !subscription || subscription.plan === 'free' ? false : false;
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

    return NextResponse.json({ 
      status: 'done', 
      report, 
      cached: false 
    });
  } catch (error) {
    console.error('[Analyze] Unexpected error:', error);
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
