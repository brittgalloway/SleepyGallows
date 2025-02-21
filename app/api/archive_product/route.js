import { NextResponse } from 'next/server'
import { performRequest } from '@/lib/datocms'
import { stripe } from '@/lib/stripe'

const PAGE_CONTENT_QUERY = `
  shop(filter: {_status: {eq: draft}}) {
    productName
    id
    _status
  }
}
`;

export async function POST() {
    try {
        const { data: { shop } } = await performRequest({ query: PAGE_CONTENT_QUERY });
        console.log(shop.id);
        const product = await stripe.products.update(
            shop.id,
            {
                active: false,
            }
        );
        
        const archiveProduct = await Promise(product);
        return NextResponse.json({ archiveProduct }, {status: 200});
    } catch (error) {
        console.log(shop.id);
        console.error(`Error deleting product: ${error}`);
        return NextResponse.json({ error: error.message }, { status: 500});
    }
}