// ============================================================
// CareerCare — API Route : Portfolio Projects
// GET /api/portfolio/[id]/projects - Liste les projets
// POST /api/portfolio/[id]/projects - Ajoute un projet
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/server'

// GET - Liste des projets
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const admin = createSupabaseAdminClient()

    const { data: projects, error } = await admin
      .from('portfolio_projects')
      .select('*')
      .eq('portfolio_id', id)
      .order('sort_order')

    if (error) {
      console.error('[Projects GET] Error:', error)
      return NextResponse.json({ projects: [] })
    }

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('[Projects GET] Error:', error)
    return NextResponse.json({ projects: [] })
  }
}

// POST - Ajouter un projet
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: portfolioId } = await params

  try {
    const body = await request.json()
    const {
      title,
      description,
      role,
      company,
      start_date,
      end_date,
      is_current,
      skills,
      metrics,
      media,
      links,
      visibility
    } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Le titre est requis' },
        { status: 400 }
      )
    }

    const admin = createSupabaseAdminClient()

    // Récupérer le sort_order max
    const { data: maxOrder } = await admin
      .from('portfolio_projects')
      .select('sort_order')
      .eq('portfolio_id', portfolioId)
      .order('sort_order', { ascending: false })
      .limit(1)
      .single() as { data: { sort_order: number } | null }

    const newSortOrder = (maxOrder?.sort_order || 0) + 1

    const { data: project, error } = await (admin as any)
      .from('portfolio_projects')
      .insert({
        portfolio_id: portfolioId,
        title,
        description: description || null,
        role: role || null,
        company: company || null,
        start_date: start_date || null,
        end_date: end_date || null,
        is_current: is_current || false,
        skills: skills || [],
        metrics: metrics || [],
        media: media || [],
        links: links || [],
        visibility: visibility || 'public',
        sort_order: newSortOrder,
      })
      .select('*')
      .single()

    if (error) {
      console.error('[Projects POST] Error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la création du projet' },
        { status: 500 }
      )
    }

    console.log(`[Projects] Created: ${project.id} in portfolio ${portfolioId}`)
    return NextResponse.json({ project })
  } catch (error) {
    console.error('[Projects POST] Error:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
