import Link from 'next/link'
import Image from 'next/image'
import { performRequest } from '@/app/lib/datocms'

export default async function Product( {params} ) {
  const PAGE_CONTENT_QUERY = `
  query Shop {
  allShops(filter: {productSlug: {eq: "${params.product}"}}) {
    originalsTitle
    productDescription(markdown: true)
    productName
    productSlug
    productType
    variations {
      id
      productImages {
        alt
        height
        id
        title
        url
        width
      }
      title
      unitPrice
      discountPrice
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
  shop {
    id
  }
}
  `;
  
    const { data: { allShops } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  return (
    <main >
        <p>{params.product}</p>
        {allShops.map((product)=>(
          <h1>{product.productName}</h1>
        ))}
    </main>
  )
}