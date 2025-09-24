import Link from 'next/link'
import { lato, cinzel_decorative } from '@/fonts'
import { ProductImages } from '@/components/productImages'
import AddToCart from '@/components/addToCart'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../sanity/lib/client'
import { USD } from '@/lib/utils'
import { stripe } from '@/lib/stripe'
import style from '@/style/product.module.scss'
import layoutStyle from '@/shop/page.module.scss'

export default async function Product( {params} ) {
  const POSTS_QUERY = await `*[
    _type == "shopProduct"
    && link.current == "${params.original}"
  ] 
  {
   "id": _id, 
    "title": productName, 
    "price": price, 
    "stock": stock, 
    "productType": productType, 
    "slug": productSlug.current, 
    "longDescription": detailedDescription,
    "shortDescription": shortDescription,
    "hasShipping": shipping.shippable,
    "shippingType": shipping.shippingOptions,
    "productDisplay": productDisplay -> {gallery[]{ alt, asset ->{url}}},
    "originalsSummary": originalsSummary->{...},
    "variant": variant[]{ title, price }
  }`;
  const product = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});

  // const product = JSON.parse(JSON.stringify(await stripe.products.retrieve(product?.id)));
  const imgHeight = product?.productDisplay[0].responsiveImage.height;
  const imgWidth = product?.productDisplay[0].responsiveImage.width;
  return (
    <main className={`${layoutStyle.main} ${style.max_width}`}>
      <div className={`${imgHeight > imgWidth ? style.product_portrait : style.product_landscape}`}>
        <h1 className={`${style.h1}`}>{product?.productName}</h1>
        <div className={`${style.imgDisplay}`}>
          <ProductImages
          photos={product?.productDisplay}
          layout={imgHeight > imgWidth ? 'portrait' : 'landscape'}
          />
        </div>
        <div className={`${style.product_info}`}>
          {product?.discount > 0 ? <div className={`${style.discount}`}>
            <p className={``} aria-label="This is the current sale price.">{USD.format(product?.discount)}</p>
            <p className={``} aria-label="This is the former price, not the price you will pay today.">{USD.format(product?.price)}</p>
            </div> :
            <div className={`${style.price}`}>
              <p>{USD.format(product?.price)}</p>
            </div>
          }
          {product?.stock > 0 ?<p className={`${style.stock}`}>In Stock</p> : <p className={`${style.no_stock}`}>Sold Out</p>}
          <div className={`${lato.className}`} dangerouslySetInnerHTML={{__html: product?.longDescription}} />
          <AddToCart
            product={product}
            stock={product?.stock}
            discount={product?.discount}
            price={product?.price}
            productDescription={product?.shortDescription}
          />
        </div>
      </div>
      <aside className={`${style.aside}`}>
        <h2 className={`${style.h2} ${cinzel_decorative.className}`}>{product?.originalsSummary?.storyName}</h2>
        <p className={`${lato.className}`}>
          {product?.originalsSummary?.storySummary?.value?.document?.children[0]?.children[0]?.value}
        </p>
          {product?.originalsSummary?.showLink !== undefined && 
            <Link  className={`${style.learn_more}`} href={`/animation/originals/${product?.originalsSummary?.showLink}`}>
              Learn More
            </Link>}
      </aside>
    </main>
  )
}