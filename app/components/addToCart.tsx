'use client'
import { useState } from 'react'
import { useCartContext } from '@/shop/cartContext'
import styles from '@/style/product.module.scss'
import { CartProduct, CartState, CartItem } from '@/lib/types'
import { calculateShipping } from '@/lib/utils'

export default function AddToCart({ id, _productName, variantName, stock, price, discount, productDescription, thumbnail, shipping }:CartProduct) {
    const { cart, setCart } = useCartContext();
    const [btnText, setBtnText] = useState('Add To Cart');
    const handleCart = () => {
        setCart((prevCart: CartState) => {
            const prevItems: CartItem[] = prevCart?.items || [];
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === id
            );

            let updatedItems;

            if (existingItemIndex !== -1) {
                updatedItems = prevItems.map((item, index) =>
                    index === existingItemIndex
                        ? item.productStock > item.quantity
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        : item
                );
            } else {
                updatedItems = [
                    ...prevItems,
                    {
                        id: id,
                        quantity: 1,
                        productName: _productName,
                        variantName: variantName,
                        productStock: stock,
                        productPrice: price,
                        productDiscount: discount,
                        productDescription: productDescription,
                        productDisplay: thumbnail,
                        shipping: shipping,
                    },
                ];
            }

            const newCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
            return {
                count: newCount,
                items: updatedItems,
                shipping: calculateShipping(updatedItems),
            };
        });
        setBtnText('Added!');
        setTimeout(() => {
            setBtnText('Add To Cart');
        }, 2000);
    };

    return (
        <> 
            {stock > 0 ? <p className={`${styles.stock}`}>In Stock</p> : <p className={`${styles.no_stock}`}>Sold Out</p>}

            <button type="button" disabled={stock <= 0} onClick={handleCart}>
                <span aria-live="polite" aria-atomic="true">{btnText}</span>
            </button>
        </>
    );
}