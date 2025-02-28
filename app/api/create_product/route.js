import { NextResponse } from 'next/server'
import { performRequest } from '@/lib/datocms'
import { stripe } from '@/lib/stripe'

const PAGE_CONTENT_QUERY = `
query Shop {
  shop(orderBy: createdAt_DESC) {
    createdAt
    productName
    id
    price
    productDescriptions
    productDisplay {
      responsiveImage {
        src
      }
    }
    shippable
    shortDescription
    stock
  }
}
`;

export async function GET() {
  try {
    const { data: { shop } } = await performRequest({ query: PAGE_CONTENT_QUERY });
    
    const products = await stripe.products.search({
      query: `id:${shop.id}`,
    });
    if (products) {
      return null;
    } else {
      const product = await stripe.products.create({
        name: shop.productName,
        id: shop.id,
        active: true,
        shippable: shop.shippable,
        unit_label: 'Qty',
        images: [shop.productDisplay[0].responsiveImage.src],
        default_price_data: {
          currency: 'usd',
          unit_amount_decimal: parseInt(shop.price, 10) * 100,
        },
        tax_code: 'txcd_99999999',
        description: shop.shortDescription,
      });
      const createdProduct = await Promise(product);
      return NextResponse.json({ createdProduct }, { status: 200 });
    }

  } catch (error) {
    console.error('Error creating products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'POST method is allowed' }, { status: 200, headers: { Allow: 'POST' } });
}
