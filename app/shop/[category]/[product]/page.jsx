import Link from 'next/link'
import { lato } from '@/app/fonts'
import { ProductImages } from '@/app/components/productImages'
import { performRequest } from '@/app/lib/datocms'
import { USD } from '@/app/utilities/formating'
import style from '@/app/style/product.module.scss'
import layoutStyle from '../../page.module.scss'

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
        productDescription       
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
            {shop?.discount > 0 ?<p className={`${style.price} discount`}>{USD.format(shop?.discount)}</p> : null}
            <p className={`${style.price}`}>{USD.format(shop?.price)}</p>
          </div>
          <div className={`${lato.className}`} dangerouslySetInnerHTML={{__html: shop?.productDescription}} />
          {shop?.stock > 0 ?<p className={`${style.stock}`}>In Stock</p> : <p className={`${style.no_stock}`}>Sold Out</p>}
          <button>Add to Cart</button>
        </div>
      </div>
      <aside className={`${style.aside}`}>
        <h2 className={`${style.h2}`}>{shop?.originalsSummary?.storyName}</h2>
        <p className={`${lato.className}`}>
          {shop?.originalsSummary?.storySummary?.value?.document?.children[0]?.children[0]?.value}
        </p>
          {shop?.originalsSummary?.showLink !== undefined ? <Link  className={`${style.learn_more}`} href={`/animation/originals/${shop?.originalsSummary?.showLink}`}>Learn More</Link> : null}
      </aside>
    </main>
  )
}