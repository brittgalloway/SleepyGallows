'use client'
import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import { USD } from '@/lib/utils'
import { ProductDetails } from '@/lib/types'
import AddToCart from '@/components/addToCart'
import style from '@/style/product.module.scss'

export default function ProductInfo({ id, title, stock, price, discount, variant, longDescription, shortDescription, img, shippingType } : ProductDetails) {
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
      <>
        <div className={`${style.product_info}`}>
          {variantProduct.discountedPrice !== null ? <div className={`${style.discount}`}>
            <p aria-label="Current sale price.">{USD.format(variantProduct.discountedPrice)}</p>
            <s aria-label="Original price, not what you pay today.">{USD.format(variantProduct.price)}</s>
            </div> :
            <div className={`${style.price}`}>
              <p>{USD.format(variantProduct.price)}</p>
            </div>
          }
        </div>
          <div className={`${style.product_discription}`}>
            <PortableText
              value={longDescription}
              // components={/* optional object of custom components to use */}
            />
          </div>
          <div className={style.addToCart}>
          {variant && (
            <label>
              <span>Choose Size</span>
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
          <AddToCart
            id={variantProduct.ID}
            _productName={title}
            variantName={variantProduct.title}
            stock={variantProduct.stock}
            discount={variantProduct.discountedPrice}
            price={variantProduct.price}
            productDescription={shortDescription}
            thumbnail={img}
            shipping={shippingType}
          />
          </div>
      </>
    );
}