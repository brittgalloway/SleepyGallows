import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

// https://docs.stripe.com/payments/checkout/after-the-payment
export async function POST(req) {
  try {
    const { origin } = new URL(req.url);
    const { items } = await req.json(); // Extract cart items
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const lineItems = items.map(item => ({
      price: item?.price, 
      quantity: item?.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: [
          'US',
          'CA',
          'MX'
        ]
      },
      shipping_options: [
        {
          shipping_rate:'shr_1QuqfTJiAoJrRPIxEZjH27YW',
        }
      ],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${origin}/shop/thank_you`, // make some kind of success page
      cancel_url: `${origin}/shop`, //update this, back to the last product: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#using-the-native-history-api
    });
    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function OPTIONS() {
  return NextResponse.json({ message: 'POST method is allowed' }, { status: 200, headers: { Allow: 'POST' } });
}
