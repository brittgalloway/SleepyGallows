import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { client } from '../../../sanity/lib/client'

// https://docs.stripe.com/payments/checkout/after-the-payment
export async function POST(req) {
  try {
    const { origin } = new URL(req.url);
    const { items, shipping } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Validate every item has an id and a positive integer quantity
    for (const item of items) {
      if (!item?.id || typeof item.id !== 'string') {
        return NextResponse.json({ error: "Invalid item ID" }, { status: 400 });
      }
      if (!Number.isInteger(item?.quantity) || item.quantity < 1) {
        return NextResponse.json({ error: "Invalid item quantity" }, { status: 400 });
      }
    }

    // Fetch authoritative prices from Sanity — never trust client-supplied prices
    const sanityIds = items.map(item => item.id);
    const sanityProducts = await client.fetch(
      `*[_type == "shopProduct" && _id in $ids]
      {
        "id": _id,
        "price": price,
        "discountedPrice": discountedPrice,
        "variant": variant[]{ ID, price, discountedPrice },
      }`,
      { ids: sanityIds }
    );

    // Index by id for quick lookup
    const priceMap = Object.fromEntries(sanityProducts.map(p => [p.id, p]));

    const lineItems = items.map(item => {
      const sanityProduct = priceMap[item.id];

      if (!sanityProduct) {
        throw new Error(`Product ${item.id} not found in Sanity`);
      }

      // If item has a variantName, find the matching variant price
      let unitPrice;
      if (item.variantName && sanityProduct.variant?.length > 0) {
        const variant = sanityProduct.variant.find(v => v.ID === item.id || v.title === item.variantName);
        if (!variant) throw new Error(`Variant "${item.variantName}" not found for product ${item.id}`);
        unitPrice = variant.discountedPrice ?? variant.price;
      } else {
        unitPrice = sanityProduct.discountedPrice ?? sanityProduct.price;
      }

      if (!unitPrice || unitPrice <= 0) {
        throw new Error(`Invalid price for product ${item.id}`);
      }

      return {
        price_data: {
          product_data: {
            name: item?.productName,
            description: item?.productDescription,
            images: [item?.productDisplay],
            tax_code: 'txcd_99999999',
            metadata: {
              id: item?.id,
            },
          },
          currency: 'usd',
          unit_amount: Math.round(unitPrice * 100), // convert dollars to cents
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shipping,
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