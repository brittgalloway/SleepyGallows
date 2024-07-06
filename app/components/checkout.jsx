// pages/checkout.js
'use client'
import { useState } from 'react'
import { useCartContext } from '../shop/cartContext'
import { loadStripe } from '@stripe/stripe-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBagShopping} from '@fortawesome/free-solid-svg-icons'
import styles from '@/app/style/shopHeader.module.scss'

require('dotenv').config();

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST);

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
        {loading ? <FontAwesomeIcon icon={faBagShopping} className={styles.loading} /> : <FontAwesomeIcon icon={faBagShopping}/>}
        {cart.count}
      </span>
  );
}
