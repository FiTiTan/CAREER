// ============================================================================
// CareerCare — API Route : Extraction PDF
// POST /api/cv/extract
// ============================================================================
//
// Étape 1/3 du pipeline :
// 1. Télécharge le PDF depuis Supabase Storage
// 2. Extrait le texte brut (pdf-parse)
// 3. Sauvegarde raw_text en base
// 4. Met le statut à 'extracted'
//
// Temps estimé : ~2s
//
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { extractTextFromDocument } from '@/lib/document-extractor';

export const maxDuration = 10;

interface ExtractRequestBody {
  analysisId: string;
}

type CVAnalysis = {
  id: string
  user_id?: string | null
  status: string
  file_name?: string
  file_path: string
  [key: string]: unknown
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ExtractRequestBody;
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

    // 2. Télécharger le PDF
    console.log(`[Extract] Downloading PDF for ${analysisId}...`);
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

    // 3. Extraire le texte
    console.log(`[Extract] Extracting text for ${analysisId}...`);
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

    // 4. Sauvegarder le texte brut
    await (admin as any)
      .from('cv_analyses')
      .update({ 
        raw_text: extraction.text, 
        status: 'extracted' 
      })
      .eq('id', analysisId);

    console.log(`[Extract] ✅ Done for ${analysisId}`);

    return NextResponse.json({
      status: 'extracted',
      textLength: extraction.text.length
    });
  } catch (error) {
    console.error('[Extract] Unexpected error:', error);
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
