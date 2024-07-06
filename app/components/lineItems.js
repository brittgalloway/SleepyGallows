import { useCartContext } from "../shop/cartContext"

export const lineItems = ()=>{
    const { cart } = useCartContext();
    console.log("line", cart.items)
    return cart.items;
} 