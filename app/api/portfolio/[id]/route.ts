// ============================================================
// CareerCare — API Route : Portfolio Detail
// GET /api/portfolio/[id] - Récupère un portfolio avec ses relations
// PATCH /api/portfolio/[id] - Met à jour un portfolio
// DELETE /api/portfolio/[id] - Supprime un portfolio
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient, createSupabaseServerClient } from '@/lib/supabase/server'

// GET - Récupérer un portfolio complet
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const admin = createSupabaseAdminClient()

    // Récupérer le portfolio
    const { data: portfolio, error: portfolioError } = await (admin as any)
      .from('portfolios')
      .select('*')
      .eq('id', id)
      .single()

    if (portfolioError || !portfolio) {
      return NextResponse.json(
        { error: 'Portfolio non trouvé' },
        { status: 404 }
      )
    }

    // Récupérer les relations
    const [
      { data: projects },
      { data: skills },
      { data: certifications },
      { data: testimonials },
      { data: education }
    ] = await Promise.all([
      (admin as any).from('portfolio_projects').select('*').eq('portfolio_id', id).order('sort_order'),
      (admin as any).from('portfolio_skills').select('*').eq('portfolio_id', id).order('sort_order'),
      (admin as any).from('portfolio_certifications').select('*').eq('portfolio_id', id).order('sort_order'),
      (admin as any).from('portfolio_testimonials').select('*').eq('portfolio_id', id).order('sort_order'),
      (admin as any).from('portfolio_education').select('*').eq('portfolio_id', id).order('sort_order'),
    ])

    return NextResponse.json({
      portfolio: {
        ...(portfolio as Record<string, unknown>),
        projects: projects || [],
        skills: skills || [],
        certifications: certifications || [],
        testimonials: testimonials || [],
        education: education || [],
      }
    })
  } catch (error) {
    console.error('[Portfolio GET] Error:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// PATCH - Mettre à jour un portfolio
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const body = await request.json()
    const { title, tagline, sector, status, settings } = body

    const admin = createSupabaseAdminClient()

    const updates: Record<string, unknown> = {}
    if (title !== undefined) updates.title = title
    if (tagline !== undefined) updates.tagline = tagline
    if (sector !== undefined) updates.sector = sector
    if (status !== undefined) updates.status = status
    if (settings !== undefined) updates.settings = settings

    const { data: portfolio, error } = await (admin as any)
      .from('portfolios')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      console.error('[Portfolio PATCH] Error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour' },
        { status: 500 }
      )
    }

    return NextResponse.json({ portfolio })
  } catch (error) {
    console.error('[Portfolio PATCH] Error:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un portfolio
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const admin = createSupabaseAdminClient()

    const { error } = await admin
      .from('portfolios')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('[Portfolio DELETE] Error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la suppression' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Portfolio DELETE] Error:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
