import Link from 'next/link'
import { cinzel_decorative } from '@/app/fonts'
import { performRequest } from '@/app/lib/datocms'
import { ProductDisplay } from './productDisplay'
import styles from '@/app/style/productCategory.module.scss'

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
      <section className={`${styles.section}`}>
        {categories.map((category) =>(
          <div className={`${styles.wrapper}`} key={category}>
            <h2 style={cinzel_decorative.style} className={`${styles.h2}`}><Link href={`/shop/${category}`}>{category}</Link></h2>
              <ul className={`${styles.category_wrapper}`} aria-label={`List of ${category} products, horizonal scroll to view more. Click on a prouct to go to that product's page.`}>
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