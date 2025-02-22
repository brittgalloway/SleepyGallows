import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { PATRON_PRODUCT } from '@/lib/stripe'

export async function POST(req) {
  try {
    const { origin } = new URL(req.url);
    const { patron } = await req.json(); // Extract patron details

    if (!patron || patron.length === 0) {
      return NextResponse.json({ error: "Patron tier not selected" }, { status: 400 });
    }

    const successURL = `${origin}/shop/patron/thank_you_patron`;
    const cancelURL = `${origin}/shop/patron`;

    const session = patron.interval === null ? 
      await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items:[ 
          {
            quantity: 1,
            price_data: {
              currency: 'usd',
              product: PATRON_PRODUCT,
              unit_amount: patron?.price * 100,
            }
          }
        ],
        mode: 'payment',
        success_url: successURL,
        cancel_url: cancelURL,
        automatic_tax: {
          enabled: false
        }
      }) : await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items:[ 
          {
            quantity: 1,
            price_data: {
              currency: 'usd',
              product: PATRON_PRODUCT,
              unit_amount: patron?.price * 100,
              recurring : {
                interval: patron?.interval, 
              }
            }
          }
        ],
        mode: 'subscription',
        submit_type: 'donate',
        success_url: successURL,
        cancel_url: cancelURL,
        automatic_tax: {
          enabled: false
        }
      }) ;

    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'POST method is allowed' }, { status: 200, headers: { Allow: 'POST' } });
}
