import Link from 'next/link'
import Image from 'next/image'
import styles from '@/style/productCategory.module.scss'


export function ProductDisplay( {category, productSlug, productName, price, discount, stock, productDisplay} ) {
  return (
    <Link className={`${styles.product_display}`} href={`/shop/${category}/${productSlug}`}>
        <Image className={`${styles.img}`}
          src={productDisplay?.asset?.url}
          width={350}
          height={280}
          alt={productDisplay?.alt}
          title={productDisplay?.caption}
        />
        <p className={`${styles.product_name}`}>&ldquo;{productName}&rdquo;</p>
        <div className={`${styles.price_wrap}`}>
        {discount !== null && stock > 0  &&
          <p className={`${styles.product_info}`}>${discount}</p>
        }
          {stock > 0 ? 
            <p className={`${styles.product_info}`}>${price}</p> : 
            <p className={`${styles.product_soldout}`}>Sold Out</p>}
        </div>
    </Link>
  )
}