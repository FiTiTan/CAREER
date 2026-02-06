// ============================================================================
// CareerCare — API Route : Get CV Report
// GET /api/cv/[id]
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { CVReport } from '@/types/cv';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: analysisId } = await params;

    if (!analysisId) {
      return NextResponse.json(
        { error: 'ID d\'analyse requis.' },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Récupérer l'analyse
    const { data: analysis, error: analysisError } = await supabase
      .from('cv_analyses')
      .select('*')
      .eq('id', analysisId)
      .single();

    if (analysisError || !analysis) {
      return NextResponse.json(
        { error: 'Analyse non trouvée.' },
        { status: 404 }
      );
    }

    // Vérifier les droits d'accès
    if (analysis.user_id && analysis.user_id !== user?.id) {
      return NextResponse.json(
        { error: 'Accès non autorisé.' },
        { status: 403 }
      );
    }

    // Si l'analyse n'est pas terminée, retourner le statut
    if (analysis.status !== 'done') {
      return NextResponse.json({
        status: analysis.status,
        message: getStatusMessage(analysis.status),
      });
    }

    // Récupérer le résultat
    const { data: result, error: resultError } = await supabase
      .from('cv_results')
      .select('*')
      .eq('analysis_id', analysisId)
      .single();

    if (resultError || !result) {
      return NextResponse.json(
        { error: 'Résultat non trouvé.' },
        { status: 404 }
      );
    }

    // Déterminer si rapport partiel
    let isPartial = !user; // Pas connecté = partiel

    if (user) {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user.id)
        .single();

      // Free : 1ère analyse complète, ensuite partiel
      // Pro/Business : toujours complet
      isPartial = false; // Pour le MVP, on montre tout aux users connectés
    }

    const report: CVReport = {
      id: analysisId,
      fileName: analysis.file_name || 'CV.pdf',
      scores: result.scores as CVReport['scores'],
      diagnostic: result.diagnostic as CVReport['diagnostic'],
      forces: (result.forces || []) as string[],
      faiblesses: (result.faiblesses || []) as string[],
      recommandations: (result.recommandations || []) as CVReport['recommandations'],
      resumeOptimise: (result.raw_response as Record<string, unknown>)?.resumeOptimise as string | undefined,
      motsClesManquants: (result.raw_response as Record<string, unknown>)?.motsClesManquants as string[] | undefined,
      compatibiliteATS: (result.raw_response as Record<string, unknown>)?.compatibiliteATS as number || 50,
      createdAt: result.created_at,
      isPartial,
    };

    return NextResponse.json({ report });
  } catch (error) {
    console.error('[GetReport] Error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}

function getStatusMessage(status: string): string {
  switch (status) {
    case 'pending':
      return 'Analyse en attente de traitement...';
    case 'extracting':
      return 'Extraction du texte du CV...';
    case 'anonymizing':
      return 'Anonymisation des données personnelles...';
    case 'analyzing':
      return 'Analyse approfondie en cours...';
    case 'deanonymizing':
      return 'Finalisation du rapport...';
    case 'error':
      return 'Une erreur est survenue. Veuillez réessayer.';
    default:
      return 'Traitement en cours...';
  }
}
