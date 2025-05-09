'use client'
import { useState } from 'react'
import { useCartContext } from '@/shop/cartContext'
import { stripePromise} from '@/lib/stripe'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { CartProduct } from '@/components/CartProduct'
import styles from '@/style/shopHeader.module.scss'
import cartStyles from '@/shop/page.module.scss'

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const { cart } = useCartContext();


  const handleCheckout = async () => {
    setLoading(true);
    const response = await fetch('/api/create_checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({items: cart?.items}),
    });
    const session = await response.json();
  
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
    if (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };
  
  return (
      <>
        <button data-testid="toggle-checkout-button" type="button" className={styles.checkout} popovertarget="cart">
          {loading ? <FontAwesomeIcon icon={faCartShopping} className={styles.loading} /> : <FontAwesomeIcon icon={faCartShopping}/>}
          {cart?.count}
        </button>
        <dialog data-testid="cart-popup" popover="true" id="cart" className={cartStyles.cart}>
          <h2>Your Cart</h2>
          {cart?.count > 0 ?
            <CartProduct/>  :
            <p>... is empty. <br/> Let's put something in it</p>
          }
          <button 
            data-testid="continue-button"
            type="button" 
            popovertarget="cart">
              Continue Shopping
            </button>
          <button 
            className={cartStyles.checkoutBtn}
            data-testid="checkout-button"
            type="button" 
            disabled={cart?.count > 0 ? false : true} 
            onClick={()=> handleCheckout()}>
              Checkout
          </button> 
        </dialog>
      </>
  );
}
