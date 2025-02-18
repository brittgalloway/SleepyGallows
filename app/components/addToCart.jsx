'use client'
import { useEffect, useState } from "react"
import { useCartContext } from "@/shop/cartContext"

export default function AddToCart({ product }) {
    const { cart, setCart } = useCartContext();
    const [ qty, setQty ] = useState(1);

    const handleQty = () => {
        setQty( qty+1 )
    }

    const handleCheckout = () => {
        setCart({
            count: cart?.count + 1,
            items: [{ 
                price: product?.default_price, 
                    quantity: qty,
                },
                ...cart.items
            ]
        });
    };

    useEffect(() => {}, [cart]);

    return (
        <fieldset>
            <label>Quantity
                <input type="number" maxLength={2} min={1} max={99} minLength={1} size={3} defaultValue={qty} onChange={handleQty}></input>
            </label>
            <button type="button" onClick={handleCheckout} onKeyDown={handleCheckout}>
                Add To Cart
            </button>
        </fieldset>
    );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       