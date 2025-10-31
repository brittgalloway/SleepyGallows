import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { lato, cinzel_decorative } from '@/fonts'
import { ProductImages } from '@/components/productImages'
import ProductInfo from '@/components/productInfo'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../sanity/lib/client'
import { stripe } from '@/lib/stripe'
import style from '@/style/product.module.scss'
import layoutStyle from '@/shop/page.module.scss'

export default async function Product( {params} ) {
  const { product } = await params
  const POSTS_QUERY = await `*[
    _type == "shopProduct"
    && productSlug.current == "${product}"
  ] 
  {
   "id": _id, 
    "title": productName, 
    "price": price, 
    "discount": discountedPrice,
    "stock": stock, 
    "productType": productType, 
    "slug": productSlug.current, 
    "longDescription": detailedDescription,
    "shortDescription": shortDescription,
    "hasShipping": shipping.shippable,
    "shippingType": shipping.shippingOptions,
    "productDisplay": productDisplay -> {gallery[]{ caption, alt, asset ->{metadata{dimensions}, url}}},
    "originalsSummary": originalsSummary->{ body[], slug, title },
    "variant": variant[]{ ID, title, price, discountedPrice, stock }
  }`;
  const _product = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  const item = _product[0];
  // const product = JSON.parse(JSON.stringify(await stripe.products.retrieve(product?.id)));
  const imgHeight = item?.productDisplay[0]?.gallery[0].asset.metadata.dimensions.height;
  const imgWidth = item?.productDisplay[0]?.gallery[0].asset.metadata.dimensions.width;
  return (
    <main className={`${layoutStyle.main} ${style.max_width}`}>
      <div className={`${imgHeight > imgWidth ? style.product_portrait : style.product_landscape}`}>
        <h1 className={`${style.h1}`}>
          {item?.title}
        </h1>
        <div className={`${style.imgDisplay}`}>
          <ProductImages
            photos={item?.productDisplay?.gallery}
            layout={imgHeight > imgWidth ? 'portrait' : 'landscape'}
            />
        </div>
        <ProductInfo
            id={item.id}
            title={item?.title}
            stock={item?.stock} 
            price={item?.price}
            discount={item?.discount} 
            variant={item?.variant} 
            longDescription={item?.longDescription}
            shortDescription={item?.shortDescription}
        />
      </div>
      <aside className={`${style.aside}`}>
        <h2 className={`${style.h2} ${cinzel_decorative.className}`}>{item?.originalsSummary?.title}</h2>
          {item?.originalsSummary && 
            <PortableText
              value={item.originalsSummary.body}
              // components={/* optional object of custom components to use */}
            />
        }
        {item?.originalsSummary &&  item?.originalsSummary?.slug.current !== null && 
          <Link  className={`${style.learn_more}`} href={`/animation/originals/${item?.originalsSummary?.slug.current}`}>
            Learn More
          </Link>}
      </aside>
    </main>
  )
}