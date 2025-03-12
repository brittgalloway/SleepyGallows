import { NextResponse } from 'next/server'
import { performRequest } from '@/lib/datocms'
import { STRIPE_WH_SECRET, stripe } from '@/lib/stripe'

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

        try {
          // Fetch current stock from DatoCMS
          const CONTENT_QUERY = `
            query GetStock($id: ItemId) {
              shop(filter: { id: { eq: $id } }) {
                id
                stock
              }
            }`;
          
          const { data } = await performRequest({ 
            query: CONTENT_QUERY, 
            variables: { id: productId }
          });

          if (!data?.shop) {
            console.log(`Product ${productId} not found in DatoCMS.`);
            continue;
          }

          const currentStock = data.shop.stock;
          const updatedStock = currentStock - quantity;

          // Update stock in DatoCMS
          const UPDATE_STOCK_MUTATION = `
            mutation UpdateStock($id: ItemId, $stock: Int) {
              updateShop(filter: { id: { eq: $id } }, data: { stock: $stock }) {
                id
                stock
              }
            }`;

          await performRequest({ 
            query: UPDATE_STOCK_MUTATION, 
            variables: { id: productId, stock: updatedStock }
          });

          console.log(`Stock updated for product ${productId}: New stock = ${updatedStock}`);
        } catch (error) {
          console.error(`Error updating stock for product ${productId}:`, error.message);
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
