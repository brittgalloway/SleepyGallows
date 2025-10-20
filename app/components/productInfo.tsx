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
        ID:string,
        price:number, 
        title:string, 
        discountedPrice:number|null, 
        stock:number
    }[], 
    longDescription: {
        children: {
            text:string
        }
    }[],
    shortDescription:string
}

export default function ProductInfo({ id, title, stock, price, discount, variant, longDescription, shortDescription } : ProductInfo) {
    const [variantProduct, setVariantProduct] = useState({ID:id, title:null, price:price, discountedPrice:discount, stock:stock});

    const handleVariant = (event: any) => {
      const item = event.target.value;
      const selectedVariant = variant.find((items) => {
        if (items.title === item) {
          return items;
        }
      });
		  setVariantProduct(selectedVariant);
    }
    return (
        <div className={`${style.product_info}`}>
          {variantProduct.discountedPrice !== null ? <div className={`${style.discount}`}>
            <p className={``} aria-label="This is the current sale price.">{USD.format(variantProduct.discountedPrice)}</p>
            <p className={``} aria-label="This is the former price, not the price you will pay today.">{USD.format(variantProduct.price)}</p>
            </div> :
            <div className={`${style.price}`}>
              <p>{USD.format(variantProduct.price)}</p>
            </div>
          }
          {variant && (
            <label>
              <p>Choose Size</p>
              <select name="options" onChange={handleVariant}>
                {variant.map((listItem) =>(
                    <option key={listItem.title} value={listItem.title}>
                        {listItem.title} - ${listItem.price}
                    </option>
                  )
                )}
              </select>
            </label>
          )}
          {variantProduct.stock > 0 ?<p className={`${style.stock}`}>In Stock</p> : <p className={`${style.no_stock}`}>Sold Out</p>}
          <div className={`${lato.className}`}>
            {longDescription?.map((content, idx)=><p key={idx} className={`${lato.className}`}>
              {content.children[0].text}
            </p>)}
          </div>
          <AddToCart
            id={variantProduct.ID}
            _productName={title}
            variantName={variantProduct.title}
            stock={variantProduct.stock}
            discount={variantProduct.discountedPrice}
            price={variantProduct.price}
            productDescription={shortDescription}
          />
        </div>
    );
}