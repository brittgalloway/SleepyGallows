import { performRequest } from '@/app/lib/datocms'
import { ProductDisplay } from '@/app/components/productDisplay'
import styles from '@/app/style/productCategory.module.scss'
import layoutStyle from '../page.module.scss'

export default async function Category({params}) {
  const PAGE_CONTENT_QUERY = `
  query Shop {
    allShops(filter: {productType: {eq: "${params.category}"}}){
    productName
    productSlug
    productType
    discount
    stock
    price
    id
    productDisplay {
      alt
      title
      id
      responsiveImage {
        src
      }
    }
  }
  }
  `;
    
    const { data: { allShops } } = await performRequest({ query: PAGE_CONTENT_QUERY });
    return (
      <main className={`${layoutStyle.main}`}>
        <h1 className={`${styles.h1}`}>{params.category}</h1>
        <div className={`${styles.grid}`}>
          {allShops.map((product)=>(
            <ProductDisplay
              key={product?.id}
              id={product?.id}
              category={params.category}
              productSlug={product?.productSlug}
              productDisplay={product?.productDisplay}
              productName={product?.productName}
              discount={product?.discount}
              stock={product?.stock}
              price={product?.price}
          />
          ))}
        </div>
        
    </main>
  )
}