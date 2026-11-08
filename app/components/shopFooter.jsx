'use client'
import { year } from '@/lib/utils'
import { LegalLinks, NavLinks } from './Footer'
import Beehiiv from '@/components/beehiiv'
import styles from '@/style/shopFooter.module.scss'
import { SocialMedia } from './Footer'

export function ShopFooter() {
    return (
     <footer className={styles.footer}>
        <SocialMedia 
        accounts={['youtube','instagram']}/>
        <h2 className={styles.title}>Sleepy Gallows Studio</h2>
        <NavLinks/>
        <Beehiiv />
        <LegalLinks/>
        <p>Copyright © {year} <em>Sleepy Gallows Studio</em> - All Rights Reserved.</p>
        <p>Powered by Stripe</p>
     </footer>
    );
  }