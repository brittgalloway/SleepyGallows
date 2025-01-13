import { NextResponse } from 'next/server'
import Stripe from 'stripe'
// import { useLineItems } from '@/lib/lineItems';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);

export async function POST(req) {
  try {
    // console.log("line",useLineItems());
    const { origin } = new URL(req.url);
    const session = await stripe.checkout.sessions.create({
      // ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: [
        {
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
    });

    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'POST method is allowed' }, { status: 200, headers: { Allow: 'POST' } });
}
