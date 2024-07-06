'use client'
import { useEffect } from "react"
import { useCartContext } from "../shop/cartContext"

export default function AddToCart({ product }) {
    const { cart, setCart } = useCartContext();

    const handleCheckout = () => {
        setCart({
            count: cart.count + 1,
            items: [{
                price: product.default_price,
                quantity:1
                }, ...cart.items]
        });
    };

    useEffect(() => {
        console.log("cart updated", cart);
    }, [cart]);

    return (
        <button onClick={handleCheckout}>
            Add To Cart
        </button>
    );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       