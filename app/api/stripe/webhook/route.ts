import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Admin client for webhook (no user context)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id;
  const plan = session.metadata?.plan;

  if (!userId || !plan) return;

  await supabaseAdmin.from('subscriptions').upsert({
    user_id: userId,
    stripe_subscription_id: session.subscription as string,
    plan,
    status: 'active',
    current_period_start: new Date().toISOString(),
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  });
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customer = await stripe.customers.retrieve(subscription.customer as string);
  const userId = (customer as Stripe.Customer).metadata?.supabase_user_id;

  if (!userId) return;

  await supabaseAdmin.from('subscriptions').update({
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
  }).eq('user_id', userId);
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const customer = await stripe.customers.retrieve(subscription.customer as string);
  const userId = (customer as Stripe.Customer).metadata?.supabase_user_id;

  if (!userId) return;

  await supabaseAdmin.from('subscriptions').update({
    status: 'canceled',
    plan: 'free',
  }).eq('user_id', userId);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // TODO: Send email notification
  console.log('Payment failed for invoice:', invoice.id);
}
