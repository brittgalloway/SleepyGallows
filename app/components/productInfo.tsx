'use client'
import { useState } from 'react'
import { USD } from '@/lib/utils'
import { lato } from '@/fonts'
import AddToCart from '@/components/addToCart'
import style from '@/style/product.module.scss'


type ProductInfo = {
    id:string, 
    title:string,
    stock:number, 
    price:number,
    discount:number, 
    variant:{
        price: number, title:string
    }[], 
    longDescription: {
        children: {
            text:string
        }
    }[],
    shortDescription:string
}

export default function ProductInfo({ id, title, stock, price, discount, variant, longDescription, shortDescription } : ProductInfo) {
      const [variantProduct, setVariantProduct] = useState(price);
    const handleVariant = (event: any) => {
		setVariantProduct(event.target.value);
    }
    return (
        <div className={`${style.product_info}`}>
          {discount !== null ? <div className={`${style.discount}`}>
            <p className={``} aria-label="This is the current sale price.">{USD.format(discount)}</p>
            <p className={``} aria-label="This is the former price, not the price you will pay today.">{USD.format(variantProduct)}</p>
            </div> :
            <div className={`${style.price}`}>
              <p>{USD.format(variantProduct)}</p>
            </div>
          }
          {variant && (
            <label>
              <p></p>
              <select name="options" onChange={handleVariant}>
                {variant.map((listItem) =>(
                    <option key={listItem.title} value={listItem.price}>
                        {listItem.title} - ${listItem.price}
                    </option>
                  )
                )}
              </select>
            </label>
          )}
          {stock > 0 ?<p className={`${style.stock}`}>In Stock</p> : <p className={`${style.no_stock}`}>Sold Out</p>}
          <div className={`${lato.className}`}>
            {longDescription?.map((content, idx)=><p key={idx} className={`${lato.className}`}>
              {content.children[0].text}
            </p>)}
          </div>
          <AddToCart
            id={id}
            _productName={title}
            stock={stock}
            discount={discount}
            price={price}
            productDescription={shortDescription}
          />
        </div>
    );
}