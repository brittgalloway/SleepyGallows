import { useCartContext } from '@/shop/cartContext'

export const useLineItems = ()=>{
    const { cart } = useCartContext();
    console.log("line", cart.items)
    return cart.items;
} 