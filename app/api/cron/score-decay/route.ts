import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Call the PostgreSQL function
    const { data, error } = await supabaseAdmin.rpc('apply_score_decay');

    if (error) {
      throw error;
    }

    // Also record daily snapshots for active users
    const { data: activeUsers } = await supabaseAdmin
      .from('career_scores')
      .select('user_id')
      .gte('last_activity_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    if (activeUsers) {
      for (const user of activeUsers) {
        await supabaseAdmin.rpc('record_score_snapshot', { p_user_id: user.user_id });
      }
    }

    return NextResponse.json({
      success: true,
      decayed_count: data,
      snapshots_recorded: activeUsers?.length || 0,
    });
  } catch (error) {
    console.error('Score decay cron error:', error);
    return NextResponse.json({ success: false, error: 'Cron job failed' }, { status: 500 });
  }
}
