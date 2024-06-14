import Link from 'next/link'
import Image from 'next/image'
import { performRequest } from '@/app/lib/datocms'
import { ProductDisplay } from '@/app/components/productDisplay';

export default async function Product( {params} ) {
  const PAGE_CONTENT_QUERY = `
  query Shop {
  allShops(filter: {productSlug: {eq: "${params.product}"}}) {
 originalsTitle
    productDescription(markdown: true)
    productName
    productSlug
    productType
    discount
    stock
    price
    productDisplay {
      alt
      title
      id
      responsiveImage {
        src
      }
    }
    originalsSummary {
      id
      storyName
      storySummary {
        links
        value
      }
    }
    id
  }
  }
  `;
  
    const { data: { allShops } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  return (
    <main>
        <p>{params.product}</p>
        {allShops.map((product)=>(
           <ProductDisplay
           key={product?.id}
           category={product?.productType}
           productSlug={product?.productSlug}
           productDisplay={product?.productDisplay}
           productName={product?.productName}
           discount={product?.discount}
           stock={product?.stock}
           price={product?.price}
         />
        ))}
    </main>
  )
}