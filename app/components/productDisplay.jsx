import Link from 'next/link'
import Image from 'next/image'
import styles from '@/style/productCategory.module.scss'


export function ProductDisplay( {category, productSlug, productName, price, discount, stock, thumbnail} ) {
  return (
    <Link className={`${styles.product_display}`} href={`/shop/${category}/${productSlug}`}>
        {thumbnail
          ? <Image className={`${styles.img}`}
              src={thumbnail}
              alt={`${productName} thumbnail`}
              width={350}
              height={280}
              title={`${productName} ${category}`}
            />
          : <div className={`${styles.img} ${styles.img_placeholder}`} role="img" aria-label={`${productName} thumbnail`} />
        }
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