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
  const imgHeight = product[0]?.productDisplay[0].responsiveImage.height;
  const imgWidth = product[0]?.productDisplay[0].responsiveImage.width;
  return (
    <main className={`${layoutStyle.main} ${style.max_width}`}>
      <div className={`${imgHeight > imgWidth ? style.product_portrait : style.product_landscape}`}>
        <h1 className={`${style.h1}`}>{product[0]?.productName}</h1>
        <div className={`${style.imgDisplay}`}>
          <ProductImages
          photos={product[0]?.productDisplay}
          layout={imgHeight > imgWidth ? 'portrait' : 'landscape'}
          />
        </div>
        <div className={`${style.product_info}`}>
          {product[0]?.discount > 0 ? <div className={`${style.discount}`}>
            <p className={``} aria-label="This is the current sale price.">{USD.format(product[0]?.discount)}</p>
            <p className={``} aria-label="This is the former price, not the price you will pay today.">{USD.format(product[0]?.price)}</p>
            </div> :
            <div className={`${style.price}`}>
              <p>{USD.format(product[0]?.price)}</p>
            </div>
          }
          {product[0]?.stock > 0 ?<p className={`${style.stock}`}>In Stock</p> : <p className={`${style.no_stock}`}>Sold Out</p>}
          <div className={`${lato.className}`} dangerouslySetInnerHTML={{__html: product[0]?.longDescription}} />
          <AddToCart
            product={product[0]}
            stock={product[0]?.stock}
            discount={product[0]?.discount}
            price={product[0]?.price}
            productDescription={product[0]?.shortDescription}
          />
        </div>
      </div>
      <aside className={`${style.aside}`}>
        <h2 className={`${style.h2} ${cinzel_decorative.className}`}>{product[0]?.originalsSummary?.storyName}</h2>
        <p className={`${lato.className}`}>
          {product[0]?.originalsSummary?.storySummary?.value?.document?.children[0]?.children[0]?.value}
        </p>
          {product[0]?.originalsSummary?.showLink !== undefined && 
            <Link  className={`${style.learn_more}`} href={`/animation/originals/${product[0]?.originalsSummary?.showLink}`}>
              Learn More
            </Link>}
      </aside>
    </main>
  )
}