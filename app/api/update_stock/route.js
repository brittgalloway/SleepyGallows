import { NextResponse } from 'next/server'
import { performRequest } from '@/lib/datocms'
import { STRIPE_SECRET_KEY, STRIPE_WH_SECRET } from '@/lib/stripe'
import Stripe from 'stripe'

const stripe = new Stripe(STRIPE_SECRET_KEY);

const endpointSecret = STRIPE_WH_SECRET;

const PAGE_CONTENT_QUERY = `
query Shop {
  shop {
    productName
    id
    price
    stock
  }
}
`

export async function POST(req) {
  console.log('Received POST request to /api/update_stock')
  console.log('Headers:', req.headers)
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);

  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoice = event.data.object
      console.log('Invoice payment succeeded. Line item product IDs:')
      invoice.lines.data.forEach(lineItem => {
        console.log(lineItem.price.product)
      })
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true, data: event.data.object })
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'POST method is allowed' }, { status: 200, headers: { Allow: 'POST' } })
}
