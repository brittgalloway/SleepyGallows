import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/style/productCategory.module.scss'


export function ProductDisplay( {category, productSlug, productName, discount, price, stock, productDisplay} ) {

  return (
    <Link className={productDisplay} href={`/shop/${category}/${productSlug}`}>
        <Image className={`${styles.img}`}
          src={productDisplay[0]?.responsiveImage?.src}
          width={350}
          height={280}
          alt={productDisplay[0]?.alt}
          title={productDisplay[0]?.title}
        />
        <p className={`${styles.productName}`}>&ldquo;{productName}&rdquo;</p>
        <div className={`${styles.priceWrap}`}>
          {discount !== 0 ? 
            <p className={`${styles.productInfo}`}>${discount}</p> : 
            null} 
          {stock > 0 ? 
            <p className={`${styles.productInfo}`}>${price}</p> : 
            <p className={`${styles.productSoldOut}`}>Sold Out</p>}
        </div>
    </Link>
  )
}