import Link from 'next/link'
import Image from 'next/image'



export function ProductDisplay( {category, productSlug, productName, discount, price, stock, productDisplay} ) {
  return (
    <Link className={productDisplay} href={`/shop/${category}/${productSlug}`}>
        <Image
        src={productDisplay[0]?.responsiveImage?.src}
        width={250}
        height={200}
        alt={productDisplay[0]?.alt}
        title={productDisplay[0]?.title}
        />
        {productName}
        {stock > 0 ? <p>In Stock</p> : <p>Sold Out</p>}
        {discount !== 0 ? <p className='discount'>{discount}</p> : null}
        <p className='price'>{price}</p>
    </Link>
  )
}