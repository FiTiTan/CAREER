// ============================================================================
// CareerCare — Database Types (Supabase)
// ============================================================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          locale: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          locale?: string;
        };
        Update: {
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          locale?: string;
          updated_at?: string;
        };
      };
      cv_analyses: {
        Row: {
          id: string;
          user_id: string | null;
          file_path: string;
          file_name: string | null;
          raw_text: string | null;
          anonymized_text: string | null;
          anonymization_map: Record<string, string> | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          file_path: string;
          file_name?: string | null;
          raw_text?: string | null;
          anonymized_text?: string | null;
          anonymization_map?: Record<string, string> | null;
          status?: string;
        };
        Update: {
          raw_text?: string | null;
          anonymized_text?: string | null;
          anonymization_map?: Record<string, string> | null;
          status?: string;
        };
      };
      cv_results: {
        Row: {
          id: string;
          analysis_id: string;
          score_global: number | null;
          scores: Record<string, number> | null;
          diagnostic: Record<string, string> | null;
          forces: string[] | null;
          faiblesses: string[] | null;
          recommandations: Record<string, unknown>[] | null;
          raw_response: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          analysis_id: string;
          score_global?: number | null;
          scores?: Record<string, number> | null;
          diagnostic?: Record<string, string> | null;
          forces?: string[] | null;
          faiblesses?: string[] | null;
          recommandations?: Record<string, unknown>[] | null;
          raw_response?: Record<string, unknown> | null;
        };
        Update: {
          score_global?: number | null;
          scores?: Record<string, number> | null;
          diagnostic?: Record<string, string> | null;
          forces?: string[] | null;
          faiblesses?: string[] | null;
          recommandations?: Record<string, unknown>[] | null;
          raw_response?: Record<string, unknown> | null;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          plan: string;
          status: string | null;
          current_period_end: string | null;
          analyses_used_this_month: number;
          analyses_reset_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan?: string;
          status?: string | null;
          current_period_end?: string | null;
          analyses_used_this_month?: number;
        };
        Update: {
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan?: string;
          status?: string | null;
          current_period_end?: string | null;
          analyses_used_this_month?: number;
          analyses_reset_at?: string;
          updated_at?: string;
        };
      };
      portfolios: {
        Row: {
          id: string;
          user_id: string;
          slug: string | null;
          title: string | null;
          data: Record<string, unknown> | null;
          template: string;
          published: boolean;
          custom_domain: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          slug?: string | null;
          title?: string | null;
          data?: Record<string, unknown> | null;
          template?: string;
          published?: boolean;
          custom_domain?: string | null;
        };
        Update: {
          slug?: string | null;
          title?: string | null;
          data?: Record<string, unknown> | null;
          template?: string;
          published?: boolean;
          custom_domain?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}
