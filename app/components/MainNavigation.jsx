'use client'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { cinzel_decorative } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/app/style/MainNavigation.module.scss'

export default function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['animation', 'art', 'comics', 'shop'];

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});
  function handleClick() {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  }

  return(
    <nav aria-label='Main' className={isMobile && isOpen ? `${styles.mobile} ${styles.nav}` : styles.nav} onClick={handleClick}>
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
          {links.map((link, index)=> (
            <li key={index} className={styles.li}>
              <Link className={`${styles.a} ${cinzel_decorative.className}`} href={`/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}