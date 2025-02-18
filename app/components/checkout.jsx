'use client'
import { useState } from 'react'
import { useCartContext } from '@/shop/cartContext'
import { stripePromise} from '@/lib/stripe'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping} from '@fortawesome/free-solid-svg-icons'
import styles from '@/style/shopHeader.module.scss'

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const { cart } = useCartContext();

  const handleCheckout = async () => {
    setLoading(true);
  
    const response = await fetch('/api/create_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart.items }),
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
      <span onClick={handleCheckout} className={styles.checkout}>
        {loading ? <FontAwesomeIcon icon={faCartShopping} className={styles.loading} /> : <FontAwesomeIcon icon={faCartShopping}/>}
        {cart.count}
      </span>
  );
}
