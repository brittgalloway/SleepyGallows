import { ProductImages } from '@/app/components/productImages'
import Link from 'next/link'
import { performRequest } from '@/app/lib/datocms'
import { USD } from '@/app/utilities/formating'
import style from '@/app/style/product.module.scss'

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
    <main>
      <div>
        <h1 className={`${style.h1}`}>{shop?.productName}</h1>
        <div className={`${style.imgSmall}`}>
         <ProductImages
          photos={shop?.productDisplay}
         />
        </div>
        <div className='product-info'>
          {shop?.discount > 0 ?<p className={`${style.price}`}>{USD.format(shop?.discount)}</p> : null}
          <p className={`${style.price}`}>{USD.format(shop?.price)}</p>
          <div dangerouslySetInnerHTML={{__html: shop?.productDescription}} />
          {shop?.stock > 0 ?<p>In Stock</p> : <p>Sold Out</p>}
          <button>Add to Cart</button>
        </div>
      </div>
      <aside>
        <h2 className={`${style.h2}`}>{shop?.originalsSummary?.storyName}</h2>
        <p>
          {shop?.originalsSummary?.storySummary?.value?.document?.children[0]?.children[0]?.value}
        </p>
          {shop?.originalsSummary?.showLink !== undefined ? <Link href={`/animation/originals/${shop?.originalsSummary?.showLink}`}>Learn More</Link> : null}
      </aside>
    </main>
  )
}