// ============================================================
// CareerCare — Migration API (temporaire, à supprimer en prod)
// POST /api/admin/migrate - Applique les migrations en attente
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/server'

// Secret pour protéger l'endpoint
const MIGRATE_SECRET = process.env.MIGRATE_SECRET || 'careercare-migrate-2026'

export async function POST(request: NextRequest) {
  // Vérifier le secret
  const { secret } = await request.json()
  if (secret !== MIGRATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createSupabaseAdminClient()
  const results: { table: string; status: string; error?: string }[] = []

  // Tester si les tables existent en essayant de les lire
  const tables = [
    'portfolios',
    'portfolio_projects',
    'portfolio_skills',
    'portfolio_certifications',
    'portfolio_testimonials',
    'portfolio_education'
  ]

  for (const table of tables) {
    try {
      const { error } = await (admin as any)
        .from(table)
        .select('id')
        .limit(1)

      if (error) {
        results.push({ table, status: 'missing', error: error.message })
      } else {
        results.push({ table, status: 'exists' })
      }
    } catch (err) {
      results.push({ table, status: 'error', error: String(err) })
    }
  }

  const missingTables = results.filter(r => r.status === 'missing')

  if (missingTables.length > 0) {
    return NextResponse.json({
      status: 'migration_needed',
      message: 'Some tables are missing. Please run the migration manually via Supabase Dashboard.',
      results,
      migration_file: 'supabase/migrations/20260206_portfolio_tables.sql',
      instructions: [
        '1. Go to https://supabase.com/dashboard',
        '2. Select your project',
        '3. Go to SQL Editor',
        '4. Copy the content of supabase/migrations/20260206_portfolio_tables.sql',
        '5. Run the SQL',
      ]
    })
  }

  return NextResponse.json({
    status: 'ok',
    message: 'All tables exist',
    results
  })
}
