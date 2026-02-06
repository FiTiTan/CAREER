// ============================================================================
// CareerCare — Supabase Server Client
// ============================================================================

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';

/**
 * Crée un client Supabase pour les Server Components et API Routes.
 * Utilise les cookies pour maintenir la session auth.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Ignore en Server Components (read-only)
          }
        },
      },
    }
  );
}

/**
 * Crée un client Supabase admin (bypass RLS).
 * À utiliser UNIQUEMENT dans les API routes pour les opérations système.
 */
export function createSupabaseAdminClient() {
  const { createClient } = require('@supabase/supabase-js');

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// Export de compatibilité pour les anciens imports
export const createClient = createSupabaseServerClient;
