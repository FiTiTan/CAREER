// ============================================================================
// CareerCare — Supabase Browser Client
// ============================================================================

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

/**
 * Crée un client Supabase pour les Client Components (navigateur).
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
