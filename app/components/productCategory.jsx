import Link from 'next/link'
import Image from 'next/image'
import { performRequest } from '@/app/lib/datocms'

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
                    <Link href={`/shop/${category}/${product.productSlug}`}>
                      <Image
                        src={product?.productDisplay[0]?.responsiveImage?.src}
                        width={250}
                        height={200}
                        alt={product?.productDisplay[0]?.alt}
                        title={product?.productDisplay[0]?.title}
                      />
                      {product?.productName}
                      <br/>
                      {product?.discount !== 0 ? product?.discount : null}
                      <br/>
                      {product?.price}
                    </Link>
                </li>
                ))}
              </ul>
          </div>
        ))}
    </section>
  )
}