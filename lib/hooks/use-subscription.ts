'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export type Plan = 'free' | 'pro' | 'business';

export interface Subscription {
  plan: Plan;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: string | null;
}

export interface PlanLimits {
  cvAnalysesPerMonth: number;
  portfolios: number;
  storageBytes: number;
  jobMatchesPerMonth: number;
  linkedinPlan: boolean;
  exportPdf: boolean;
  analytics: boolean;
  api: boolean;
}

const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    cvAnalysesPerMonth: 3,
    portfolios: 1,
    storageBytes: 100 * 1024 * 1024, // 100 MB
    jobMatchesPerMonth: 10,
    linkedinPlan: false,
    exportPdf: false,
    analytics: false,
    api: false,
  },
  pro: {
    cvAnalysesPerMonth: Infinity,
    portfolios: Infinity,
    storageBytes: 1024 * 1024 * 1024, // 1 GB
    jobMatchesPerMonth: Infinity,
    linkedinPlan: false,
    exportPdf: true,
    analytics: true,
    api: false,
  },
  business: {
    cvAnalysesPerMonth: Infinity,
    portfolios: Infinity,
    storageBytes: 10 * 1024 * 1024 * 1024, // 10 GB
    jobMatchesPerMonth: Infinity,
    linkedinPlan: true,
    exportPdf: true,
    analytics: true,
    api: true,
  },
};

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  async function fetchSubscription() {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setSubscription({ plan: 'free', status: 'active', currentPeriodEnd: null });
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('subscriptions')
        .select('plan, status, current_period_end')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setSubscription({
          plan: data.plan as Plan,
          status: data.status,
          currentPeriodEnd: data.current_period_end,
        });
      } else {
        setSubscription({ plan: 'free', status: 'active', currentPeriodEnd: null });
      }
    } catch (error) {
      setSubscription({ plan: 'free', status: 'active', currentPeriodEnd: null });
    } finally {
      setLoading(false);
    }
  }

  const limits = subscription ? PLAN_LIMITS[subscription.plan] : PLAN_LIMITS.free;
  const isPro = subscription?.plan === 'pro' || subscription?.plan === 'business';
  const isBusiness = subscription?.plan === 'business';

  return { subscription, limits, isPro, isBusiness, loading };
}
