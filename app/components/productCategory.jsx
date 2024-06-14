import Link from 'next/link'
import { performRequest } from '@/app/lib/datocms'
import { ProductDisplay } from './productDisplay';

const PAGE_CONTENT_QUERY = `
query Shop {
  allShops {
    id
    productType
    productName
    productSlug
    stock
    price
    discount
    productDisplay {
      alt
      title
      id
      responsiveImage {
        src
      }
    }
  }
}
`;

const categories = ['collage', 'prints', 'books', 'stickers'];

export async function ProductCategory() {
  const { data: { allShops } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
      <section>
        {categories.map((category) =>(
          <div key={category}>
            <h2><Link href={`/shop/${category}`}>{category}</Link></h2>
              <ul aria-label={`List of ${category} products, horizonal scroll to view more. Click on a prouct to go to that product's page.`}>
                {allShops.filter((product) => product.productType === category).map((product) =>(
                  <li key={product.id}>
                    <ProductDisplay
                      category={category}
                      productSlug={product?.productSlug}
                      productDisplay={product?.productDisplay}
                      productName={product?.productName}
                      discount={product?.discount}
                      stock={product?.stock}
                      price={product?.price}
                    />
                </li>
                ))}
              </ul>
          </div>
        ))}
    </section>
  )
}