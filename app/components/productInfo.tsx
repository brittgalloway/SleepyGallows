'use client'
import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import { USD } from '@/lib/utils'
import { ProductDetails } from '@/lib/types'
import AddToCart from '@/components/addToCart'
import style from '@/style/product.module.scss'

type VariantState = {
  ID: string
  title: string | undefined
  price: number
  discountedPrice: number | null
  stock: number
}

export default function ProductInfo({ id, title, stock, price, discount, variant, longDescription, shortDescription, img, shippingType } : ProductDetails) {
    const [variantProduct, setVariantProduct] = useState<VariantState>({
      ID: id,
      title: undefined,
      price: price,
      discountedPrice: discount ?? null,
      stock: stock,
    });

    const handleVariant = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (!variant) return;
      const item = event.target.value;
      const selectedVariant = variant.find((items) => items.title === item);
      if (selectedVariant) setVariantProduct({
        ...selectedVariant,
        title: selectedVariant.title,
        discountedPrice: selectedVariant.discountedPrice,
      });
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
            discount={variantProduct.discountedPrice ?? undefined}
            price={variantProduct.price}
            productDescription={shortDescription}
            thumbnail={img}
            shipping={shippingType}
          />
          </div>
      </>
    );
}