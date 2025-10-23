'use client'
import { useEffect, useState } from 'react'
import { useCartContext } from '@/shop/cartContext'
import styles from '@/style/product.module.scss'

type CartProduct = {
    id:string, 
    _productName:string,
    variantName?:string,
    stock:number, 
    price:number,
    discount?:number,
    productDescription:any
}

export default function AddToCart({ id, _productName, variantName, stock, price, discount, productDescription }:CartProduct) {
    const { cart, setCart } = useCartContext();
    const [btnText, setBtnText] = useState('Add To Cart');

    const handleCart = () => {
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
                        // price: product?.default_price,
                        quantity: 1,
                        productName: _productName,
                        variantName:variantName,
                        productStock: stock,
                        productPrice: price,
                        productDiscount: discount,
                        productDescription: productDescription,
                        // productDisplay: product?.images?.[0],
                    },
                ];
            }

            const newCount = updatedItems.reduce((total, item) => total + item.quantity, 0);

            return {
                count: newCount,
                items: updatedItems,
            };
        });
        setBtnText('Added!');
        setTimeout(() => {
            setBtnText('Add To Cart');
        }, 2000);
    };

    useEffect(() => {}, [cart]);

    return (
        <div className={styles.addToCart}> 
            {stock > 0 ?<p className={`${styles.stock}`}>In Stock</p> : <p className={`${styles.no_stock}`}>Sold Out</p>}

            <button type="button" disabled={stock <= 0} onClick={handleCart} onKeyDown={handleCart}>
                {btnText}
            </button>
        </div>
    );
}