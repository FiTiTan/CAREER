import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const onboarding = searchParams.get('onboarding');
  const next = searchParams.get('next') ?? '/hub';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Redirect to onboarding for new users
      if (onboarding === 'true') {
        return NextResponse.redirect(`${origin}/hub/onboarding`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth error, redirect to login
  return NextResponse.redirect(`${origin}/login?error=auth_error`);
}
