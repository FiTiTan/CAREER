'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CareerScore, PILLAR_CONFIG, PillarKey } from '@/types/score';

export function useCareerScore() {
  const [score, setScore] = useState<CareerScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchScore();
  }, []);

  async function fetchScore() {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('career_scores')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (data) {
        setScore(transformData(data));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch score');
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    try {
      const response = await fetch('/api/score/compute');
      const result = await response.json();
      
      if (result.success) {
        await fetchScore();
      }
    } catch (err) {
      setError('Failed to refresh score');
    }
  }

  return { score, loading, error, refresh };
}

function transformData(data: any): CareerScore {
  const pillars: CareerScore['pillars'] = {} as CareerScore['pillars'];

  for (const key of Object.keys(PILLAR_CONFIG) as PillarKey[]) {
    const value = data[`pillar_${key}`] || 0;
    pillars[key] = {
      value,
      weight: PILLAR_CONFIG[key].module === 'CV Coach' ? 0.20 :
              PILLAR_CONFIG[key].module === 'Portfolio' ? 0.20 :
              PILLAR_CONFIG[key].module === 'LinkedIn' ? 0.20 :
              PILLAR_CONFIG[key].module === 'Job Match' ? 0.15 :
              PILLAR_CONFIG[key].module === 'Coffre-Fort' ? 0.10 : 0.15,
      module: PILLAR_CONFIG[key].module,
      factors: [],
      trend: 'stable',
    };
  }

  return {
    id: data.id,
    user_id: data.user_id,
    total: data.total,
    pillars,
    recommended_action: data.recommended_action,
    computed_at: data.computed_at,
    updated_at: data.updated_at,
  };
}
