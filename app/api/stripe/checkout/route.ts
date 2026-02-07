import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Lazy initialization to avoid build-time errors
let stripe: Stripe | null = null;
function getStripe() {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2026-01-28.clover',
    });
  }
  return stripe;
}

const PRICE_IDS = {
  pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
  pro_yearly: process.env.STRIPE_PRICE_PRO_YEARLY,
  business_monthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY,
  business_yearly: process.env.STRIPE_PRICE_BUSINESS_YEARLY,
};

export async function POST(request: Request) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { priceId, plan, interval } = await request.json();
    const stripeClient = getStripe();

    // Get or create Stripe customer
    let customerId: string;
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (profile?.stripe_customer_id) {
      customerId = profile.stripe_customer_id;
    } else {
      const customer = await stripeClient.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);
    }

    // Create checkout session
    const session = await stripeClient.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId || PRICE_IDS[`${plan}_${interval}` as keyof typeof PRICE_IDS],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/hub/settings/subscription?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/hub/settings/subscription?canceled=true`,
      metadata: {
        user_id: user.id,
        plan,
        interval,
      },
    });

    return NextResponse.json({
      success: true,
      data: { url: session.url },
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create checkout session' }, { status: 500 });
  }
}
