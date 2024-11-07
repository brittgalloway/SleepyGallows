'use client'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import Link from 'next/link'
import { cinzel_decorative } from '@/fonts'
import { rgbDataURL } from '@/lib/utils'
import styles from '@/style/MainNavigation.module.scss'

export default function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['animation', 'art', 'comics', 'shop'];

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});
  function handleClick() {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  }

  return(
    <nav aria-label='Main' className={isMobile && isOpen ? `${styles.mobile} ${styles.nav}` : styles.nav} onClick={handleClick}>

        <div className={styles.mobileMenu} >
          <button className={styles.hamburger} onClick={handleClick}>
            <Image src='/hamburger.svg' 
            width={40} 
            height={30} 
            alt="hamburger menu"/>
          </button>
        </div> 
      
      {(isOpen || !isMobile) && (
        <ul aria-label="Site Menu">
              <li className={`${styles.li} ${styles.about}`}>
                <Link className={`${styles.a} ${cinzel_decorative.className}`} href="/about">About</Link>
              </li>
          
          <li className={`${styles.li} ${styles.logo}`}>
            <Link className={`${styles.a} ${cinzel_decorative.className}`} href="/about">
              <Image 
                className="logo" 
                width={250} 
                height={250} 
                src="/sg_logo.svg" 
                alt="Logo, click here to learn about the Sleepy Gallows."
                placeholder='blur'
                blurDataURL={rgbDataURL(154, 200, 243)}
                loading='lazy'/>
            </Link>
          </li>
           
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