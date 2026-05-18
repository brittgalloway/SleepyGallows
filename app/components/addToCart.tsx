'use client'
import { useState } from 'react'
import { useCartContext } from '@/shop/cartContext'
import styles from '@/style/product.module.scss'
import { CartProduct } from '@/lib/types'

export default function AddToCart({ id, _productName, variantName, stock, price, discount, productDescription, thumbnail, shipping }:CartProduct) {
    const { cart, setCart } = useCartContext();
    const [btnText, setBtnText] = useState('Add To Cart');
    const handleCart = () => {
        let currentShipping;
        setCart((prevCart) => {
            const prevItems = prevCart?.items || []; // Ensure we handle an empty cart properly
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
                        variantName:variantName,
                        productStock: stock,
                        productPrice: price,
                        productDiscount: discount,
                        productDescription: productDescription,
                        productDisplay: thumbnail,
                        shipping: shipping,
                    },
                ];
                currentShipping = getShipping(shipping)
            }
            function getShipping(itemShipping) {
                try {
                    const cartShipping = cart?.shipping;
                    if (cartShipping == null || cartShipping == undefined) {
                            return currentShipping = 800;
                        }else
                    if(cartShipping !== 0) {
                        if (itemShipping == 'fine art') {
                            return currentShipping = 0;
                        } else
                            if (itemShipping == 'books') {
                                return currentShipping = cartShipping <= 1000 ? 1000 : 800;
                            } else
                            if (itemShipping == 'print domestic') {
                                return currentShipping = cartShipping <= 800 ? 800 : 800;
                            }else
                                if (itemShipping == 'stickers') {
                                    return currentShipping = cartShipping <= 200 ? 200 : 800;
                            }
                    } else {
                        currentShipping = 0;
                    }
                } catch (error) {
                    console.error('Something went wrong finding the shipping. A default $8 charge was added to your order');
                    return currentShipping = 800; 
                }
            }
            const newCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
            return {
                count: newCount,
                items: updatedItems,
                shipping: currentShipping ?? prevCart.shipping,
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