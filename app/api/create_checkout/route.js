import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

// https://docs.stripe.com/payments/checkout/after-the-payment
export async function POST(req) {
  try {
    const { origin } = new URL(req.url);
    const { items } = await req.json(); 
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
          metadata: {
            id: item?.id,
          },
        },
        currency: 'usd',
        unit_amount: item?.productDiscount > 0 ? item?.productDiscount * 100 : item?.productPrice  * 100,
      },
      quantity: item?.quantity,
      })
    );
    const getShipping = (items) => {
      if (!items || items.length === 0) {
        return { name: 'No items', price: 0 };
      }

      // Normalize names for safer matching
      const types = items.map((item) =>
        item.productName?.toLowerCase()
      );

      const hasFineArt = types.some((t) => t.includes('fine art'));
      const hasPrint = types.some((t) => t.includes('print'));
      const hasBook = types.some((t) => t.includes('book'));
      const hasSticker = types.some((t) => t.includes('sticker'));

      // 🔴 Priority logic
      if (hasFineArt) {
        return { shipping_price: 0 };
      }

      if (hasPrint && !hasFineArt && !hasBook) {
        return { shipping_price: 800 }; // cents
      }

      if (hasBook && !hasFineArt) {
        return { shipping_price: 1000 }; // cents
      }

      if (hasSticker && !hasFineArt && !hasPrint && !hasBook) {
        return { shipping_price: 300 }; // cents
      }

      // fallback
      return { shipping_price: 300 }; // cents
    };
    const shipping = getShipping(items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: [
          'US',
        ]
      },
       shipping_options: [
        {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: shipping.shipping_price,
          currency: 'usd',
        },
        display_name: 'Domestic Ground Shipping',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 5,
          },
          maximum: {
            unit: 'business_day',
            value: 7,
          },
        },
      },
    },
      ],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${origin}/shop/thank_you`,
      cancel_url: `${origin}/shop`,
    });
    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (err) {
    console.error('STRIPE ERROR:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function OPTIONS() {
  return NextResponse.json({ message: 'POST method is allowed' }, { status: 200, headers: { Allow: 'POST' } });
}
