// ============================================================
// CareerCare — API Route : Portfolio
// GET /api/portfolio - Liste les portfolios de l'utilisateur
// POST /api/portfolio - Crée un nouveau portfolio
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient, createSupabaseServerClient } from '@/lib/supabase/server'

// GET - Liste des portfolios
export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    const admin = createSupabaseAdminClient()

    // Si connecté, récupérer les portfolios de l'utilisateur
    if (user) {
      const { data: portfolios, error } = await admin
        .from('portfolios')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('[Portfolio GET] Error:', error)
        return NextResponse.json({ portfolios: [] })
      }

      return NextResponse.json({ portfolios })
    }

    // Non connecté - retourner liste vide
    return NextResponse.json({ portfolios: [] })
  } catch (error) {
    console.error('[Portfolio GET] Error:', error)
    return NextResponse.json({ portfolios: [] })
  }
}

// POST - Créer un portfolio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, tagline, sector, cvAnalysisId } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Le titre est requis' },
        { status: 400 }
      )
    }

    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    const admin = createSupabaseAdminClient()

    // Créer le portfolio
    const { data: portfolio, error } = await (admin as any)
      .from('portfolios')
      .insert({
        user_id: user?.id || null,
        title,
        tagline: tagline || null,
        sector: sector || null,
        status: 'draft',
        settings: {},
      })
      .select('*')
      .single()

    if (error) {
      console.error('[Portfolio POST] Error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la création du portfolio' },
        { status: 500 }
      )
    }

    console.log(`[Portfolio] Created: ${portfolio.id}`)

    // Si import depuis CV demandé, importer les compétences
    if (cvAnalysisId) {
      try {
        // Récupérer les résultats de l'analyse
        const { data: results } = await admin
          .from('cv_results')
          .select('*')
          .eq('analysis_id', cvAnalysisId)
          .single()

        if (results) {
          // Importer les compétences détectées
          // TODO: Parser les compétences depuis results.diagnostic
          console.log(`[Portfolio] Importing from CV analysis: ${cvAnalysisId}`)
        }
      } catch (importError) {
        console.warn('[Portfolio] CV import failed:', importError)
      }
    }

    return NextResponse.json({ portfolio })
  } catch (error) {
    console.error('[Portfolio POST] Error:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
