import Link from 'next/link'
import Image from 'next/image'
import { performRequest } from '@/app/lib/datocms'

export default async function Category({params}) {
  const PAGE_CONTENT_QUERY = `
  query Shop {
    allShops(filter: {productType: {eq: "${params.category}"}}){
      originalsTitle
      productDescription(markdown: true)
      productName
      productSlug
      productType
      id
    }
  }
  `;
    
    const { data: { allShops } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  return (
    <main >
        <p>{params.category}</p>
        {allShops.map((product)=>(
          <h1>{product.productName}</h1>
        ))}
        
    </main>
  )
}