'use client'
import Link from 'next/link'
import { year } from '@/lib/utils'
import {NEWSLETTER } from '@/lib/data' 
import Beehiiv from '@/components/beehiiv'
import styles from '@/style/shopFooter.module.scss'
import { SocialMedia } from './Footer'

export function ShopFooter() {
    const links = ['animation', 'comics', 'art', 'about'];
    return (
     <footer className={styles.footer}>
        <SocialMedia 
        accounts={['youtube','instagram']}/>
        <p className={styles.title}>Sleepy Gallows Studio</p>
        <ul className={styles.ul}>
            { links.map((link, index) =>(
              <li key={index}><Link href={`/${link}`}>{link}</Link></li>
            ))
          }
          <li><Link href={NEWSLETTER}>blog</Link></li>
        </ul>
        <Beehiiv />
        <p>Copyright © {year} Sleepy Gallows Studio - All Rights Reserved.</p>
        <p>Powered by Stripe</p>
     </footer>
    );
  }