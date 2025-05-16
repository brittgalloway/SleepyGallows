import Link from 'next/link'
import { lato, cinzel_decorative } from '@/fonts'
import { ProductImages } from '@/components/productImages'
import AddToCart from '@/components/addToCart'
import { performRequest } from '@/lib/datocms'
import { USD } from '@/lib/utils'
import { stripe } from '@/lib/stripe'
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
        price
        discount
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

  const product = JSON.parse(JSON.stringify(await stripe.products.retrieve(shop?.id)));
  const imgHeight = shop?.productDisplay[0].responsiveImage.height;
  const imgWidth = shop?.productDisplay[0].responsiveImage.width;
  return (
    <main className={`${layoutStyle.main} ${style.max_width}`}>
      <div className={`${imgHeight > imgWidth ? style.product_portrait : style.product_landscape}`}>
        <h1 className={`${style.h1}`}>{shop?.productName}</h1>
        <div className={`${style.imgDisplay}`}>
          <ProductImages
          photos={shop?.productDisplay}
          layout={imgHeight > imgWidth ? 'portrait' : 'landscape'}
          />
        </div>
        <div className={`${style.product_info}`}>
          {shop?.discount > 0 ? <div className={`${style.discount}`}>
            <p className={``} aria-label="This is the current sale price.">{USD.format(shop?.discount)}</p>
            <p className={``} aria-label="This is the former price, not the price you will pay today.">{USD.format(shop?.price)}</p>
            </div> :
            <div className={`${style.price}`}>
              <p>{USD.format(shop?.price)}</p>
            </div>
          }
          {shop?.stock > 0 ?<p className={`${style.stock}`}>In Stock</p> : <p className={`${style.no_stock}`}>Sold Out</p>}
          <div className={`${lato.className}`} dangerouslySetInnerHTML={{__html: shop?.productDescriptions}} />
          <AddToCart
            product={product}
            stock={shop?.stock}
            discount={shop?.discount}
            price={shop?.price}
            productDescription={shop?.productDescriptions}
          />
        </div>
      </div>
      <aside className={`${style.aside}`}>
        <h2 className={`${style.h2} ${cinzel_decorative.className}`}>{shop?.originalsSummary?.storyName}</h2>
        <p className={`${lato.className}`}>
          {shop?.originalsSummary?.storySummary?.value?.document?.children[0]?.children[0]?.value}
        </p>
          {shop?.originalsSummary?.showLink !== undefined && 
            <Link  className={`${style.learn_more}`} href={`/animation/originals/${shop?.originalsSummary?.showLink}`}>
              Learn More
            </Link>}
      </aside>
    </main>
  )
}