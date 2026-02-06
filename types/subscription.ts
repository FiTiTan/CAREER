// ============================================================================
// CareerCare — Types Subscription
// ============================================================================

export type Plan = 'free' | 'pro' | 'business';

export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'trialing'
  | 'incomplete';

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan: Plan;
  status: SubscriptionStatus | null;
  current_period_end: string | null;
  analyses_used_this_month: number;
  analyses_reset_at: string;
  created_at: string;
  updated_at: string;
}

/** Limites par plan */
export const PLAN_LIMITS: Record<Plan, {
  analysesPerMonth: number;
  portfolios: number;
  jobMatches: number;
  vaultDocs: number;
  features: string[];
}> = {
  free: {
    analysesPerMonth: 1,
    portfolios: 1,
    jobMatches: 5,
    vaultDocs: 3,
    features: ['cv_partial', 'portfolio_watermark', 'linkedin_score'],
  },
  pro: {
    analysesPerMonth: -1, // illimité
    portfolios: 3,
    jobMatches: -1,
    vaultDocs: -1,
    features: ['cv_full', 'portfolio_custom', 'linkedin_suggestions', 'vault_unlimited', 'ereputation_dashboard'],
  },
  business: {
    analysesPerMonth: -1,
    portfolios: -1,
    jobMatches: -1,
    vaultDocs: -1,
    features: ['cv_export_pdf', 'portfolio_booking', 'job_auto_apply', 'linkedin_plan_30j', 'vault_versioning', 'ereputation_analytics', 'support_chat'],
  },
};
