import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/style/productCategory.module.scss'
import { USD } from '../utilities/formating'


export function ProductDisplay( {category, productSlug, productName, discount, price, stock, productDisplay} ) {

  return (
    <Link className={productDisplay} href={`/shop/${category}/${productSlug}`}>
        <Image className={`${styles.img}`}
          src={productDisplay[0]?.responsiveImage?.src}
          width={250}
          height={200}
          alt={productDisplay[0]?.alt}
          title={productDisplay[0]?.title}
        />
        <p className={`${styles.productName}`}>"{productName}"</p>
        {discount !== 0 ? <p className={`${styles.productInfo}`}>{USD.format(discount)}</p> : null}
        <p className={`${styles.productInfo}`}>{USD.format(price)}</p>
        {stock > 0 ? null : <p className={`${styles.productSoldOut}`}>Sold Out</p>}
    </Link>
  )
}