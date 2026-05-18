import { NextResponse } from 'next/server'
import { stripe, PATRON_PRODUCT } from '@/lib/stripe.server'

export async function POST(req) {
  try {
    const { origin } = new URL(req.url);
    const { patron } = await req.json();

    if (!patron || !patron.interval) {
      return NextResponse.json({ error: 'Patron tier not selected' }, { status: 400 });
    }

    // Call create_promotion server-to-server with the internal secret
    const promoResponse = await fetch(`${origin}/api/create_promotion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': process.env.INTERNAL_API_SECRET,
      },
      body: JSON.stringify({ interval: patron?.interval }),
    });

    if (!promoResponse.ok) {
      console.error('[create_patron] Failed to create promo code');
    }

    const promoData = await promoResponse.json();
    const promoCode = promoData?.promo?.code || '';
    const unitPrice = patron?.price * 100;
    const successURL = `${origin}/shop/patron/thank_you_patron?promo=${encodeURIComponent(promoCode)}&interval=${patron?.interval || 1}`;
    const cancelURL = `${origin}/shop/patron`;

    const session = patron.interval === 'once'
      ? await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency: 'usd',
                product: PATRON_PRODUCT,
                unit_amount: unitPrice,
              },
            },
          ],
          mode: 'payment',
          submit_type: 'donate',
          origin_context: 'web',
          invoice_creation: {
            enabled: true,
            invoice_data: {
              description: `Exclusive Patron Coupon Code: ${promoCode}`,
            },
          },
          success_url: successURL,
          cancel_url: cancelURL,
          automatic_tax: { enabled: false },
        })
      : await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency: 'usd',
                product: PATRON_PRODUCT,
                unit_amount: unitPrice,
                recurring: {
                  interval: patron?.interval,
                },
              },
            },
          ],
          mode: 'subscription',
          submit_type: 'donate',
          subscription_data: {
            description: `Patron discount code: ${promoCode} for ${patron?.interval}.`,
          },
          origin_context: 'web',
          success_url: successURL,
          cancel_url: cancelURL,
          automatic_tax: { enabled: false },
        });

    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (err) {
    console.error('PATRON ERROR:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}