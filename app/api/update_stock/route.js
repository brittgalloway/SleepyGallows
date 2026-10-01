import { NextResponse } from 'next/server'
import { STRIPE_WH_SECRET, stripe } from '@/lib/stripe.server'
import { client } from '../../../sanity/lib/client'

const endpointSecret = STRIPE_WH_SECRET;

export async function POST(req) {

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log(`[update_stock] session.payment_status: ${session.payment_status}`);

      if (session.payment_status !== 'paid') {
        console.log(`[update_stock] Session ${session.id} not yet paid, skipping.`);
        break;
      }

      console.log(`[update_stock] Fetching line items for session ${session.id}...`);
      let lineItemsResponse;
      try {
        lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price.product'],
          limit: 100,
        });
        console.log(`[update_stock] Got ${lineItemsResponse.data.length} line item(s).`);
      } catch (err) {
        console.error(`[update_stock] Failed to fetch line items:`, err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
      }

      const allResults = [];

      for (const lineItem of lineItemsResponse.data) {
        const product = lineItem.price.product;
        const sanityID = product.metadata?.id;
        const quantity = lineItem.quantity;

        console.log(`[update_stock] Line item — Stripe product: ${product.id}, sanityID: ${sanityID}, qty: ${quantity}`);

        if (!sanityID) {
          console.error(`[update_stock] No Sanity ID in metadata for Stripe product ${product.id}, skipping.`);
          continue;
        }

        try {
          const products = await client.fetch(
            `*[_type == "shopProduct" && (_id == $id || $id in variant[].ID)]
            {
              "id": _id,
              "stock": stock,
              "variant": variant[ID == $id]{ "_key": _key, "stock": stock },
            }`,
            { id: sanityID }
          );

          console.log(`[update_stock] Sanity fetch result for ${sanityID}:`, JSON.stringify(products));

          if (!products || products.length === 0) {
            console.error(`[update_stock] Product ${sanityID} not found in Sanity.`);
            continue;
          }

          const hit = products[0];
          const isVariant = hit.variant && hit.variant.length > 0;
          console.log(`[update_stock] isVariant: ${isVariant}, hit.id: ${hit.id}, current stock: ${hit.stock}`);

          let result;
          if (isVariant) {
            const variantKey = hit.variant[0]._key;
            const currentVariantStock = hit.variant[0].stock;
            const newStock = Math.max(0, currentVariantStock - quantity);
            console.log(`[update_stock] Patching variant _key=${variantKey}, stock ${currentVariantStock} → ${newStock}`);
            result = await client
              .patch(hit.id)
              .set({ [`variant[_key=="${variantKey}"].stock`]: newStock })
              .commit({ autoGenerateArrayKeys: true });
          } else {
            const newStock = Math.max(0, hit.stock - quantity);
            console.log(`[update_stock] Patching product stock ${hit.stock} → ${newStock}`);
            result = await client
              .patch(hit.id)
              .set({ stock: newStock })
              .commit();
          }

          console.log(`[update_stock] Patch committed for ${sanityID}:`, JSON.stringify(result));
          allResults.push(result);
        } catch (error) {
          console.error(`[update_stock] Error patching ${sanityID}: ${error.message}`, error);
        }
      }

      console.log(`[update_stock] Done. ${allResults.length} product(s) updated.`);
      return NextResponse.json({ data: allResults }, { status: 201 });
    }

    default:
      console.log(`[update_stock] Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'POST method is allowed' }, { status: 200, headers: { Allow: 'POST' } });
}