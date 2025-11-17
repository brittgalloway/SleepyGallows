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
        const productId = lineItem.price.product;
        const quantity = lineItem.quantity;
        const product = JSON.parse(JSON.stringify(await stripe.products.retrieve(productId)));
        const sanityID = product.metadata.id;
        try {
          // Fetch current product from Santity

          // const products = await client.fetch(`*[_type == "shopProduct" && _id == "${sanityID}"]`);
          const products = await client.fetch(`*[_type == "shopProduct" && _id == "${sanityID}" || variant[].ID match "${sanityID}"]
            {
              _id == '${sanityID}' => {
                "id": _id, 
                "stock": stock,
              },
              variant[].ID match '${sanityID}' => {
                "variant": variant[ID == '${sanityID}']{ stock },
              }
            }`);

          if (!products) {
            console.error(`Product ${sanityID} not found in Santity.`);
            continue;
          }
          const results = await client.patch(sanityID) ?
              client.patch(sanityID).dec({stock: quantity}).commit() :
              client.patch(products[0].variant[0]).dec({stock: quantity}).commit();
          return NextResponse.json({ data: results }, { status: 201 });
        } catch (error) {
          console.error(`Error updating stock for product ${sanityID}, product object retrieved ${product}:`, error.message);
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
