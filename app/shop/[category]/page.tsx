import { ProductDisplay } from '@/components/productDisplay'
import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import styles from '@/style/productCategory.module.scss'
import layoutStyle from '@/shop/page.module.scss'

export default async function Category({params}) {
  const { category } = await params;
  const POSTS_QUERY = await `*[
    _type == "shopProduct"
    && productType == "${category}"
  ] 
  {
    "id": _id, 
    "title": productName, 
    "price": price, 
    "discount": discountedPrice,
    "stock": stock, 
    "productType": productType, 
    "slug": productSlug.current,
    "thumbnail": Thumbnail.asset -> {url},
  }`;
  const products = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <main className={`${layoutStyle.main}`}>
      <h1>{category.replace('-', ' ')}</h1>
      <div className={`${styles.grid}`}>
        {products.map((product)=>(
          <ProductDisplay
            key={product?.id}
            category={category}
            productSlug={product?.slug}
            productName={product?.title}
            discount={product?.discount}
            stock={product?.stock}
            price={product?.price}
            thumbnail={product?.thumbnail?.url}
        />
        ))}
      </div>
    </main>
  )
}