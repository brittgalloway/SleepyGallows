import { NextResponse } from 'next/server'
import { STRIPE_WH_SECRET, stripe } from '@/lib/stripe'
import {client} from '../../../sanity/lib/client'

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

  // Handle the event
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      console.log('Invoice payment succeeded. Updating stock values...');

      for (const lineItem of invoice.lines.data) {
        const productId = lineItem.price.id;
        const quantity = lineItem.quantity;
        const product = await stripe.products.retrieve(productId);
        console.log("product: ",product)
        // const sanityID = product.metadata.id;
        try {
          // Fetch current stock from Santity

          const products = await client.fetch(`*[_type == "shopProduct" && _id == ${productId}]`);

          if (!products) {
            console.error(`Product ${productId} not found in Santity.`);
            continue;
          }
            return client.patch(productId)
              .dec({stock: quantity})
              .commit()
              .then((updatedStock) => {
                  console.log('Hurray, the stock is updated! New document:', updatedStock)
                })
        } catch (error) {
          console.error(`Error updating stock for product ${sanityID}:`, error.message);
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true, data: event.data.object });
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'POST method is allowed' }, { status: 200, headers: { Allow: 'POST' } });
}
