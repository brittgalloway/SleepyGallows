import { NextResponse } from 'next/server'
import { performRequest } from '@/lib/datocms'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);

const PAGE_CONTENT_QUERY = `
query Shop {
  allShops {
    productName
    id
    price
    shippable
    shortDescription
    productDisplay {
      responsiveImage {
        src
      }
    }
  }
}
`;

export async function GET() {
  try {
    const { data: { allShops } } = await performRequest({ query: PAGE_CONTENT_QUERY });

    const productPromises = allShops.map(async (datoProduct) => {
      const product = await stripe.products.create({
        name: datoProduct.productName,
        id: datoProduct.id,
        active: true,
        shippable: datoProduct.shippable,
        unit_label: 'Qty',
        images: [datoProduct.productDisplay[0].responsiveImage.src],
        default_price_data: {
          currency: 'usd',
          unit_amount_decimal: parseInt(datoProduct.price, 10) * 100,
        },
        tax_code: 'txcd_99999999',
        description: datoProduct.shortDescription,
      });
      return { id: product.id };
    });

    const createdProducts = await Promise.all(productPromises);
    return NextResponse.json({ createdProducts }, { status: 200 });
  } catch (err) {
    console.error('Error creating products:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'GET method is allowed' }, { status: 200, headers: { Allow: 'GET' } });
}
