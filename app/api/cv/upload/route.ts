// ============================================================================
// CareerCare — API Route : Upload CV
// POST /api/cv/upload
// ============================================================================
//
// Accepte un PDF, le valide, l'upload vers Supabase Storage,
// crée l'entrée en base, et retourne l'ID d'analyse.
//
// Accessible SANS authentification (pour le hook gratuit).
// Si l'user est connecté, le CV est rattaché à son compte.
//
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { validateDocumentFile } from '@/lib/document-extractor';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  try {
    // 1. Récupérer le fichier
    const formData = await request.formData();
    const file = formData.get('cv') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni. Envoyez votre CV dans le champ "cv".' },
        { status: 400 }
      );
    }

    // 2. Validations
    try {
      validateDocumentFile(file);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Fichier invalide' },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();

    // 3. Identifier l'utilisateur (optionnel)
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 4. Vérifier les limites si user connecté
    if (user) {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan, analyses_used_this_month, analyses_reset_at')
        .eq('user_id', user.id)
        .single();

      if (subscription) {
        // Reset mensuel si nécessaire
        const resetDate = new Date(subscription.analyses_reset_at);
        const now = new Date();
        const needsReset =
          now.getMonth() !== resetDate.getMonth() ||
          now.getFullYear() !== resetDate.getFullYear();

        if (!needsReset) {
          // Vérifier la limite
          const limit = subscription.plan === 'free' ? 1 : -1;
          if (
            limit > 0 &&
            subscription.analyses_used_this_month >= limit
          ) {
            return NextResponse.json(
              {
                error: 'Vous avez atteint votre limite d\'analyses ce mois-ci.',
                code: 'LIMIT_REACHED',
                upgrade: true,
              },
              { status: 429 }
            );
          }
        }
      }
    }

    // 5. Upload vers Supabase Storage
    const admin = createSupabaseAdminClient();
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = user
      ? `cvs/${user.id}/${fileName}`
      : `cvs/anonymous/${fileName}`;

    const { error: uploadError } = await admin.storage
      .from('cv-uploads')
      .upload(filePath, Buffer.from(buffer), {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      console.error('[Upload] Storage error:', uploadError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'upload du fichier.' },
        { status: 500 }
      );
    }

    // 6. Créer l'entrée en base
    const { data: analysis, error: dbError } = await admin
      .from('cv_analyses')
      .insert({
        user_id: user?.id || null,
        file_path: filePath,
        file_name: file.name,
        status: 'pending',
      })
      .select('id')
      .single();

    if (dbError || !analysis) {
      console.error('[Upload] DB error:', dbError);
      return NextResponse.json(
        { error: 'Erreur lors de la création de l\'analyse.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: analysis.id,
      message: 'CV uploadé avec succès. Lancez l\'analyse via POST /api/cv/analyze.',
    });
  } catch (error) {
    console.error('[Upload] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}
