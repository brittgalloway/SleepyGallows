'use client'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { cinzel_decorative } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/style/MainNavigation.module.scss'

export default function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});
  function handleClick() {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  }

  return(
    <nav aria-label='Main' className={isMobile && isOpen ? `${styles.mobile} ${styles.nav}` : styles.nav} onClick={handleClick}>
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
        <ul aria-label="Site Menu">
          {isMobile && 
              <li className={styles.li}>
                <Link className={`${styles.a} ${cinzel_decorative.className}`} href="/about">About</Link>
              </li>
          }
          {(!isOpen || !isMobile) &&
          <li className={styles.li}>
            <Link className={`${styles.a} ${cinzel_decorative.className}`} href="/about">
              <Image 
                className="logo" 
                width={250} 
                height={250} 
                src="/sg_logo.svg" 
                alt="logo, click here to learn about the Sleepy Gallows."
              />
            </Link>
          </li>
           } 
          <li className={styles.li}><Link className={`${styles.a} ${cinzel_decorative.className}`} href="/animation">Animation</Link></li>
          <li className={styles.li}><Link className={`${styles.a} ${cinzel_decorative.className}`} href="/comics">Comics</Link></li>
          <li className={styles.li}><Link className={`${styles.a} ${cinzel_decorative.className}`} href="/art">Art</Link></li>
          <li className={styles.li}><Link className={`${styles.a} ${cinzel_decorative.className}`} href="/shop">Shop</Link></li>
        </ul>
      )}
    </nav>
  )
}