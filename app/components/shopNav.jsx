'use client'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/style/shopHeader.module.scss'

export default function ShopNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});
  function handleClick() {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  }

  return(
    // <nav aria-label='Main' className={isMobile && isOpen ? `${styles.mobile} ${styles.nav}` : styles.nav} onClick={handleClick}>
    <nav className={styles.nav}>
      {isMobile ? 
        <div className={styles.mobileMenu} >
          <button className={styles.hamburger} onClick={handleClick}>
            <Image src='/hamburger.svg' 
            width={40} 
            height={30} 
            alt="hamburger menu"/>
          </button>
        </div> : null
      }
      
      {(isOpen || !isMobile) && (
        <ul aria-label="Shop Menu" className={styles.navList}>
          <li><Link href="/shop/collage">collage</Link></li>
          <li><Link href="/shop/prints">prints</Link></li>
          <li><Link href="/shop/stickers">stickers</Link></li>
          <li><Link href="/shop/books">books</Link></li>
          <li><Link href="/shop/patron">patron</Link></li>
          {isMobile && 
              <li>
                  <Link href="#">Account</Link>
              </li>
          }
        </ul>
      )}
    </nav>
  )
}