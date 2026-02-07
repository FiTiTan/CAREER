import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { PILLAR_WEIGHTS } from '@/types/score';

export async function GET() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get current scores from each module
    const [cvData, portfolioData, linkedinData, jobData, vaultData, repData] = await Promise.all([
      supabase.from('cv_analyses').select('score').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
      supabase.from('portfolios').select('id, published').eq('user_id', user.id),
      supabase.from('linkedin_profiles').select('score').eq('user_id', user.id).single(),
      supabase.from('applications').select('status').eq('user_id', user.id),
      supabase.from('vault_files').select('id').eq('user_id', user.id),
      supabase.from('reputation_scans').select('overall_score').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
    ]);

    // Calculate pillar scores
    const pillars = {
      documents: calculateDocumentsScore(cvData.data),
      visibility: calculateVisibilityScore(portfolioData.data),
      network: calculateNetworkScore(linkedinData.data),
      dynamique: calculateDynamiqueScore(jobData.data),
      organisation: calculateOrganisationScore(vaultData.data),
      presence: calculatePresenceScore(repData.data),
    };

    // Calculate total
    const total = Math.round(
      pillars.documents * PILLAR_WEIGHTS.documents +
      pillars.visibility * PILLAR_WEIGHTS.visibility +
      pillars.network * PILLAR_WEIGHTS.network +
      pillars.dynamique * PILLAR_WEIGHTS.dynamique +
      pillars.organisation * PILLAR_WEIGHTS.organisation +
      pillars.presence * PILLAR_WEIGHTS.presence
    );

    // Update career_scores table
    await supabase.from('career_scores').upsert({
      user_id: user.id,
      total,
      pillar_documents: pillars.documents,
      pillar_visibility: pillars.visibility,
      pillar_network: pillars.network,
      pillar_dynamique: pillars.dynamique,
      pillar_organisation: pillars.organisation,
      pillar_presence: pillars.presence,
      last_activity_at: new Date().toISOString(),
      computed_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: { total, pillars },
    });
  } catch (error) {
    console.error('Score compute error:', error);
    return NextResponse.json({ success: false, error: 'Failed to compute score' }, { status: 500 });
  }
}

function calculateDocumentsScore(data: any): number {
  if (!data) return 0;
  return Math.min(100, data.score || 0);
}

function calculateVisibilityScore(data: any): number {
  if (!data || data.length === 0) return 0;
  const hasPortfolio = data.length > 0 ? 40 : 0;
  const hasPublished = data.some((p: any) => p.published) ? 60 : 0;
  return hasPortfolio + hasPublished;
}

function calculateNetworkScore(data: any): number {
  if (!data) return 0;
  return Math.min(100, data.score || 0);
}

function calculateDynamiqueScore(data: any): number {
  if (!data || data.length === 0) return 20;
  const active = data.filter((a: any) => ['applied', 'interview'].includes(a.status)).length;
  return Math.min(100, 20 + active * 20);
}

function calculateOrganisationScore(data: any): number {
  if (!data || data.length === 0) return 0;
  return Math.min(100, data.length * 20);
}

function calculatePresenceScore(data: any): number {
  if (!data) return 0;
  return Math.min(100, data.overall_score || 0);
}
