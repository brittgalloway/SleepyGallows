'use client'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import Link from 'next/link'
import { USER_ACCOUNT_LINK } from '@/lib/stripe'
import styles from '@/style/shopHeader.module.scss'

export default function ShopNavigation() {

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});
  const links = ['fine-art', 'prints', 'stickers', 'books', 'patron'];

  return(
    <nav aria-label='Main shop navigation' className={isMobile ? `${styles.mobile} ${styles.nav}` : styles.nav}>
    { isMobile ? (
      <>
        <div className={styles.mobile_menu} >
          <button className={styles.hamburger} data-testid="toggle-shop-nav-button" type="button" popovertarget="shop-nav">
            <Image src='/hamburger.svg' 
            width={40} 
            height={30} 
            alt="hamburger menu"/>
          </button>
        <dialog data-testid="shop-nav" id="shop-nav" popover="true">
           <ul aria-label="Shop Menu" className={styles.nav_list}>
            {links.map((link, index) => (
              <li key={index}>
                <Link href={`/shop/${link}`}>{link.replace('-', ' ')}</Link></li>
            ))}
            <li>
                <a href={USER_ACCOUNT_LINK}>Account</a>
            </li>
          </ul>
        </dialog>
        </div>
      </>
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