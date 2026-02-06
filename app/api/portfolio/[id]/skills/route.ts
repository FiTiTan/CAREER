// ============================================================
// CareerCare — API Route : Portfolio Skills
// GET /api/portfolio/[id]/skills - Liste les compétences
// POST /api/portfolio/[id]/skills - Ajoute une compétence
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/server'

// GET - Liste des compétences
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const admin = createSupabaseAdminClient()

    const { data: skills, error } = await admin
      .from('portfolio_skills')
      .select('*')
      .eq('portfolio_id', id)
      .order('sort_order')

    if (error) {
      console.error('[Skills GET] Error:', error)
      return NextResponse.json({ skills: [] })
    }

    return NextResponse.json({ skills })
  } catch (error) {
    console.error('[Skills GET] Error:', error)
    return NextResponse.json({ skills: [] })
  }
}

// POST - Ajouter une compétence
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: portfolioId } = await params

  try {
    const body = await request.json()
    const {
      name,
      category,
      level,
      years_experience,
      proof_project_ids
    } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Le nom est requis' },
        { status: 400 }
      )
    }

    const admin = createSupabaseAdminClient()

    // Récupérer le sort_order max
    const { data: maxOrder } = await admin
      .from('portfolio_skills')
      .select('sort_order')
      .eq('portfolio_id', portfolioId)
      .order('sort_order', { ascending: false })
      .limit(1)
      .single() as { data: { sort_order: number } | null }

    const newSortOrder = (maxOrder?.sort_order || 0) + 1

    const { data: skill, error } = await (admin as any)
      .from('portfolio_skills')
      .insert({
        portfolio_id: portfolioId,
        name,
        category: category || 'hard',
        level: level || 3,
        years_experience: years_experience || null,
        proof_project_ids: proof_project_ids || [],
        sort_order: newSortOrder,
      })
      .select('*')
      .single()

    if (error) {
      console.error('[Skills POST] Error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la création de la compétence' },
        { status: 500 }
      )
    }

    console.log(`[Skills] Created: ${skill.id} in portfolio ${portfolioId}`)
    return NextResponse.json({ skill })
  } catch (error) {
    console.error('[Skills POST] Error:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
