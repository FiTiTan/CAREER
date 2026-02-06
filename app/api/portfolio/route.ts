// ============================================================
// API Route : /api/portfolio
// GET (list) / POST (create)
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/portfolio
 * Liste tous les portfolios de l'utilisateur connecté
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Vérifier l'authentification
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Récupérer les portfolios
    const { data: portfolios, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Portfolio API] Error fetching portfolios:', error);
      return NextResponse.json(
        { error: 'Failed to fetch portfolios' },
        { status: 500 }
      );
    }

    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error('[Portfolio API] GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/portfolio
 * Crée un nouveau portfolio
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Vérifier l'authentification
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { slug, title, data, template, published = false } = body;

    // Validation
    if (!slug || !title || !data || !template) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Vérifier que le slug est unique pour cet utilisateur
    const { data: existing } = await supabase
      .from('portfolios')
      .select('id')
      .eq('user_id', user.id)
      .eq('slug', slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 409 }
      );
    }

    // Créer le portfolio
    const { data: portfolio, error } = await (supabase as any)
      .from('portfolios')
      .insert({
        user_id: user.id,
        slug,
        title,
        data,
        template,
        published,
      })
      .select()
      .single();

    if (error) {
      console.error('[Portfolio API] Error creating portfolio:', error);
      return NextResponse.json(
        { error: 'Failed to create portfolio' },
        { status: 500 }
      );
    }

    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error) {
    console.error('[Portfolio API] POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
