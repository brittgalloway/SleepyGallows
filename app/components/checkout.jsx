'use client'
import { useState } from 'react'
import { useCartContext } from '@/shop/cartContext'
import { stripePromise} from '@/lib/stripe'
import { CartProduct } from '@/components/CartProduct'
import styles from '@/style/shopHeader.module.scss'
import cartStyles from '@/shop/page.module.scss'

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
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
    if (!response.ok) {
      setHasError(true);
      setLoading(false);
    }
    const session = await response.json();
  
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
    if (error) {
      setHasError(true);
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
      <>
        <button data-testid="toggle-checkout-button" type="button" className={styles.checkout} popoverTarget="cart">
    
          <svg id="cart-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            
          {cart?.count}
        </button>
        <dialog data-testid="cart-popup" popover="auto" id="cart" className={cartStyles.cart}>
          <h2>Your Cart</h2>
          {cart?.count > 0 ?
            <CartProduct />  :
            <p>... is empty. <br/> Let&apos;s put something in it.</p>
          }
          <button 
            data-testid="continue-button"
            type="button" 
            popoverTarget="cart">
              Continue Shopping
            </button>
          {cart?.count > 0 && 
          <>
            {hasError ? <p>Oops, something went wrong! We might be out of stock. Refresh and try again.</p> : ''}
            <button 
              className={cartStyles.checkoutBtn}
              data-testid="checkout-button"
              type="button" 
              disabled={cart?.count > 0 && !hasError ? false : true} 
              onClick={()=> handleCheckout()}>
                {loading ? <div aria-label="A spinning dotted circle while the computer thinks." className="spinner"></div> : 'Checkout'}
            </button> 
          </>
          }
        </dialog>
      </>
  );
}
