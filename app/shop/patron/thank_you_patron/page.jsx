'use client'
import { useEffect } from 'react';
import { lato } from '@/fonts'
import styles from '@/shop/page.module.scss'
import patronStyles from '@/shop/patron/patron.module.scss'



export default function PatronThanks() {
  async function createPromotion() {
    await fetch('/api/create_promotion', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
    });
  }
  useEffect(() => {
    createPromotion();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={patronStyles.patron_h1}>Thank you for becoming a Patron!</h1>
      <p>A coupn code should be sent to your email within 24 hours.</p>
      <p>If not, please reach out to bg@sleepygallows.com</p>
    </main>
  )
}


