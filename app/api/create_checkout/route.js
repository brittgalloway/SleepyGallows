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
      price_data:{
        product_data:{
          name: item?.productName,
          description: item?.productDescription,
          images: [item?.productDisplay],
          tax_code: 'txcd_99999999',
        },
        currency: 'usd',
        unit_amount: item?.productDiscount > 0 ? item?.productDiscount * 100 : item?.productPrice  * 100,
      },
      metadata: {
        id: item?.id,
      },
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
      success_url: `${origin}/shop/thank_you`,
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
