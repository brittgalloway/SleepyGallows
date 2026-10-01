import { type Metadata } from 'next'
import { cache } from 'react'
import { ProductDisplay } from '@/components/productDisplay'
import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import styles from '@/style/productCategory.module.scss'
import layoutStyle from '@/shop/page.module.scss'

const POSTS_QUERY = (category: string) => `*[
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

const getProducts = cache(async (category: string) => {
  return client.fetch<SanityDocument[]>(POSTS_QUERY(category), {});
});

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  const products = await getProducts(category);
  const categoryName = category.replace('-', ' ').toUpperCase();

  return {
    title: `${categoryName} | Sleepy Gallows | Chicago`,
  };
}

export default async function Category({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const products = await getProducts(category);

  return (
    <main className={`${layoutStyle.main}`}>
      <h1>{category.replace('-', ' ')}</h1>
      <div className={`${styles.grid}`}>
        {products.map((product) => (
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