'use client'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import MobileNav from './MobileNav'
import styles from '@/style/shopHeader.module.scss'

export default function ShopNavigation() {

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});
  const links = ['fine-art', 'prints', 'stationary', 'patron'];

  return(
    <nav aria-label='Main shop navigation' className={isMobile ? `${styles.mobile} ${styles.nav}` : styles.nav}>
    { isMobile ? (
      <MobileNav 
        navType='shop' 
        navId='shop-nav' 
        testId='shop-nav-button' 
        ariaLabel='Shop Menu' 
        navItems={links} />
    ) : (
      <ul aria-label="Shop Menu" className={styles.nav_list}>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={`/shop/${link}`}>{link.replace('-', ' ')}</Link></li>
        ))}
      </ul>
    )}
      
    </nav>
  )
}