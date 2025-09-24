import Link from 'next/link'
import { cinzel_decorative } from '@/fonts'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../sanity/lib/client'
import { ProductDisplay } from './productDisplay'
import styles from '@/style/productCategory.module.scss'

const POSTS_QUERY = `
  *[_type == "shopProduct"]
  {
    "id": _id, 
    "title": productName, 
    "price": price, 
    "stock": stock, 
    "productType": productType, 
    "slug": productSlug.current, 
    "productDisplay": productDisplay -> {gallery[]{ alt, asset ->{url}}}
  }
`;

const categories = ['fine-art', 'prints', 'stationary'];

export async function ProductCategory() {
  const products = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
      <section className={`${styles.section}`}>
        {categories.map((category) =>(
          <div className={`${styles.wrapper}`} key={category}>
            <h2 style={cinzel_decorative.style} className={`${styles.h2}`}><Link href={`/shop/${category}`}>{category}</Link></h2>
              <ul className={`${styles.category_wrapper}`} aria-label={`List of ${category} products, horizonal scroll to view more. Click on a prouct to go to that product's page.`}>
                {products.filter((product) => product.productType === category).map((product) =>(
                  <li key={product.id}>
                    <ProductDisplay
                      category={category}
                      productSlug={product?.slug}
                      productDisplay={product?.productDisplay.gallery[0]}
                      productName={product?.title}
                      stock={product?.stock}
                      discount={product?.discount}
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