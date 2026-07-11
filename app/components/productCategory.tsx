import Link from 'next/link'
import { cinzel_decorative } from '@/fonts'
import { client } from 'b/sanityLib/client'
import { ProductDisplay } from './productDisplay'
import styles from '@/style/productCategory.module.scss'

type ShopProduct = {
  id: string
  title: string
  price: number
  discount: number | null
  stock: number
  productType: string
  slug: string
  thumbnail: { url: string } | null
}

const POSTS_QUERY = `
  *[_type == "shopProduct"]
  {
    "id": _id, 
    "title": productName, 
    "price": price, 
    "discount": discountedPrice,
    "stock": stock, 
    "productType": productType, 
    "slug": productSlug.current, 
    "thumbnail": Thumbnail.asset -> {url},
  }
`;

const categories = ['fine-art', 'prints', 'stationery'];

export async function ProductCategory() {
  const products = await client.fetch<ShopProduct[]>(POSTS_QUERY, {});
  return (
      <section className={`${styles.section}`}>
        {categories.map((category) =>(
          <div className={`${styles.wrapper}`} key={category}>
            <h2 style={cinzel_decorative.style} className={`${styles.h2}`}><Link href={`/shop/${category}`}>{category.replace('-', ' ')}</Link></h2>
              <ul className={`${styles.category_wrapper}`} aria-label={`${category} products. Scroll horizontally to view more.`}>
                {products.filter((product) => product.productType === category).map((product) =>(
                  <li key={product.id}>
                    <ProductDisplay
                      category={category}
                      productSlug={product?.slug}
                      thumbnail={product?.thumbnail?.url}
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