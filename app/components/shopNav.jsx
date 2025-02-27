'use client'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import Link from 'next/link'
import { userAccountLink } from '@/lib/stripe'
import styles from '@/style/shopHeader.module.scss'

export default function ShopNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});
  function handleClick() {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  }
  const links = ['collage', 'prints', 'stickers', 'books', 'patron'];
  return(
    <nav aria-label='Main shop navigation' className={isMobile && isOpen ? `${styles.mobile} ${styles.nav}` : styles.nav} onClick={handleClick}>
      {isMobile ? 
        <div className={styles.mobile_menu} >
          <button className={styles.hamburger} onClick={handleClick}>
            <Image src='/hamburger.svg' 
            width={40} 
            height={30} 
            alt="hamburger menu"/>
          </button>
        </div> : null
      }
      
      {(isOpen || !isMobile) && (
        <ul aria-label="Shop Menu" className={styles.nav_list}>
          {links.map((link, index) => (
            <li key={index}>
              <Link href={`/shop/${link}`}>{link}</Link></li>
          ))}
          {isMobile && 
              <li>
                  <a href={userAccountLink}>Account</a>
              </li>
          }
        </ul>
      )}
    </nav>
  )
}