'use client'
import { useEffect } from "react"
import { useCartContext } from "@/shop/cartContext"

export default function AddToCart({ product, discount, stock, price, productDescription}) {
    const { cart, setCart } = useCartContext();
    const handleCart = () => {
        setCart({
            count: cart?.count + 1,
            items: [{ 
                    price: product?.default_price, 
                    quantity: 1,
                    productName: product?.name,
                    productStock: stock,
                    productPrice: price,
                    productDiscount: discount,
                    productDescription: productDescription,
                    productDisplay: product?.images[0]
                },
                ...cart.items
            ]
        });
    };

    useEffect(() => {
        const sgCartCount = sessionStorage.getItem('sgCartCount');
        const sgCartItems = sessionStorage.getItem('sgCartItems');
        if (sgCartCount > 0) {
            setCart({
                count: sgCartCount,
                items: sgCartItems,
            });
        } else {
            sessionStorage.removeItem('sgCartCount');
            sessionStorage.removeItem('sgCartItems');
        }
        sessionStorage.setItem('sgCartCount', JSON.stringify(cart.count));
        sessionStorage.setItem('sgCartItems', JSON.stringify(cart.items));
    }, [cart]);

    return (
        <button type="button" disabled={stock <= 0} onClick={handleCart} onKeyDown={handleCart}>
            Add To Cart
        </button> 
    );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       