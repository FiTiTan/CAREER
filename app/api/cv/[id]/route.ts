// API Route pour charger une analyse (bypass RLS)
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

type CVAnalysis = {
  id: string
  status: string
  [key: string]: unknown
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  console.log(`[GET /api/cv/${id}] Loading analysis...`);
  
  const admin = createSupabaseAdminClient();
  
  const { data: analysis, error } = await admin
    .from('cv_analyses')
    .select('*')
    .eq('id', id)
    .single() as { data: CVAnalysis | null; error: unknown };
  
  if (error || !analysis) {
    console.log(`[GET /api/cv/${id}] Not found`);
    return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
  }
  
  // Si done, charger aussi les résultats
  let results = null;
  if (analysis.status === 'done') {
    const { data: resultsData } = await admin
      .from('cv_results')
      .select('*')
      .eq('analysis_id', id)
      .single();
    results = resultsData;
  }
  
  console.log(`[GET /api/cv/${id}] Found: status=${analysis.status}`);
  
  return NextResponse.json({ analysis, results });
}
