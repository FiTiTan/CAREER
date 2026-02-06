// ============================================================================
// CareerCare — API Route : Anonymisation RGPD
// POST /api/cv/anonymize
// ============================================================================
//
// Étape 2/3 du pipeline :
// 1. Lit raw_text depuis la base
// 2. Anonymise via Mistral (EU)
// 3. Sauvegarde anonymized_text + anonymization_map
// 4. Met le statut à 'anonymized'
//
// Temps estimé : ~5-8s
//
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { anonymizeCV } from '@/lib/ai/anonymizer';

export const maxDuration = 10;

interface AnonymizeRequestBody {
  analysisId: string;
}

type CVAnalysis = {
  id: string
  raw_text?: string | null
  status: string
  [key: string]: unknown
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnonymizeRequestBody;
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

    if (!analysis.raw_text) {
      return NextResponse.json(
        { error: 'Le texte brut n\'a pas encore été extrait. Appelez /api/cv/extract d\'abord.' },
        { status: 400 }
      );
    }

    // 2. Anonymiser via Mistral (EU)
    console.log(`[Anonymize] Anonymizing for ${analysisId}...`);
    let anonymization;

    try {
      anonymization = await anonymizeCV(analysis.raw_text);
    } catch (error) {
      console.error('[Anonymize] Mistral error:', error);
      await updateStatus(admin, analysisId, 'error');
      return NextResponse.json(
        { error: 'Erreur lors de l\'anonymisation. Veuillez réessayer.' },
        { status: 500 }
      );
    }

    // 3. Sauvegarder
    await (admin as any)
      .from('cv_analyses')
      .update({
        anonymized_text: anonymization.anonymizedText,
        anonymization_map: anonymization.map,
        status: 'anonymized',
      })
      .eq('id', analysisId);

    console.log(`[Anonymize] ✅ Done for ${analysisId}`);

    return NextResponse.json({
      status: 'anonymized',
      anonymizedLength: anonymization.anonymizedText.length
    });
  } catch (error) {
    console.error('[Anonymize] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}

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
