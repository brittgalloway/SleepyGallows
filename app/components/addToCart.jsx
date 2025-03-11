'use client'
import { useEffect } from 'react'
import { useCartContext } from '@/shop/cartContext'

export default function AddToCart({ product, discount, stock, price, productDescription }) {
    const { cart, setCart } = useCartContext();

    const handleCart = () => {
        setCart((prevCart) => {
            const prevItems = prevCart?.items || []; // Ensure we handle an empty cart properly
            const existingItemIndex = prevItems.findIndex(
                (item) => item.price === product?.default_price
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
                        price: product?.default_price,
                        quantity: 1,
                        productName: product?.name,
                        productStock: stock,
                        productPrice: price,
                        productDiscount: discount,
                        productDescription: productDescription,
                        productDisplay: product?.images?.[0],
                    },
                ];
            }

            const newCount = updatedItems.reduce((total, item) => total + item.quantity, 0);

            return {
                count: newCount,
                items: updatedItems,
            };
        });
    };

    useEffect(() => {}, [cart]);

    return (
        <button type="button" disabled={stock <= 0} onClick={handleCart} onKeyDown={handleCart}>
            Add To Cart
        </button>
    );
}