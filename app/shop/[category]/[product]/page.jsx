import Link from 'next/link'
import { lato, cinzel_decorative } from '@/fonts'
import { ProductImages } from '@/components/productImages'
import AddToCart from '@/components/AddToCart'
import { performRequest } from '@/lib/datocms'
import { USD } from '@/lib/utils'
import style from '@/style/product.module.scss'
import layoutStyle from '@/shop/page.module.scss'

export default async function Product( {params} ) {
  const PAGE_CONTENT_QUERY = `
    query MyQuery {
      shop(filter: {productSlug: {eq: "${params.product}"}}) {
        id
        productName
        productSlug
        productType
        stock
        discount
        price
        productDescriptions       
        originalsSummary {
          id
          storyName
          showLink
          storySummary {
            links
            value
          }
        }
        productDisplay {
          alt
          id
          title
          responsiveImage {
            src
            height
            width
          }
        }
      }
    }
  `;
  const { data: { shop } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);

  const product = await stripe.products.retrieve(shop?.id);

  return (
    <main className={`${layoutStyle.main} ${style.max_width}`}>
      <div className={`${style.product}`}>
        <h1 className={`${style.h1}`}>{shop?.productName}</h1>
        <div className={`${style.img_small}`}>
         <ProductImages
          photos={shop?.productDisplay}
         />
        </div>
        <div className={`${style.product_info}`}>
          <div>
            {shop?.discount > 0 ? <p className={`${style.price} discount`}>{USD.format(shop?.discount)}</p> : null}
            <p className={`${style.price}`}>{USD.format(shop?.price)}</p>
          </div>
          <div className={`${lato.className}`} dangerouslySetInnerHTML={{__html: `${shop?.productDescriptions}`}} />
          {shop?.stock > 0 ?<p className={`${style.stock}`}>In Stock</p> : <p className={`${style.no_stock}`}>Sold Out</p>}
          <AddToCart
            product={product}
          />
        </div>
      </div>
      <aside className={`${style.aside}`}>
        <h2 className={`${style.h2} ${cinzel_decorative.className}`}>{shop?.originalsSummary?.storyName}</h2>
        <p className={`${lato.className}`}>
          {shop?.originalsSummary?.storySummary?.value?.document?.children[0]?.children[0]?.value}
        </p>
          {shop?.originalsSummary?.showLink !== undefined ? 
            <Link  className={`${style.learn_more}`} href={`/animation/originals/${shop?.originalsSummary?.showLink}`}>
            Learn More
            </Link> : null}
      </aside>
    </main>
  )
}