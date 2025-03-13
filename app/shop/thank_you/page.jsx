'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { useCartContext } from '@/shop/cartContext'
import styles from '../page.module.scss'

export default function ThankYou() {
    const { cart, setCart } = useCartContext();

    useEffect(() => {
        setCart({ count: 0, items: [] });
    }, []);

    return (
        <div className={styles.wrapper}>
            <p>[first name][last name]</p>
            <h1>Thank you for your order!</h1>
            <p>Every sale helps this small artist continue her art journey~</p>
            <p>Order Number: [order #]</p>
            <p>Orders should be shipped within 7 business days, and you will get notified, but remember, shipping is done by USPS and are out of my control.</p>
            <p>If you have any issues please email support@sleepygallows.com</p>
            <Link href='/shop/'>Continue Shopping</Link>
        </div>
    );
}
