'use client'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import Link from 'next/link'
import { rgbDataURL } from '@/lib/utils'
import MobileNav from './MobileNav'
import styles from '@/style/MainNavigation.module.scss'
import textStyles from '@/style/titles.module.scss'

export default function MainNavigation() {
  const links = ['animation', 'art', 'comics', 'shop'];

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});

  return(
    <nav aria-label='Main' className={isMobile ? `${styles.mobile} ${styles.nav}` : styles.nav}>
      { isMobile ? (
      <MobileNav 
        navType='main' 
        navId='main-nav' 
        testId='main-nav-button' 
        ariaLabel='Site Menu' 
        navItems={links} />
    ) : (
      <ul aria-label="Site Menu">
          <li className={`${styles.li} ${styles.logo}`}>
            <Link className={`${styles.a}`} href="/about">
              <Image  
                className="logo" 
                width={250} 
                height={250} 
                src="/sg_logo.svg" 
                alt="Click here to learn about the Sleepy Gallows."
                placeholder='blur'
                blurDataURL={rgbDataURL(154, 200, 243)}
                loading='lazy'/>
            </Link>
          </li>
           
          {links.map((link, index)=> (
            <li key={index} className={styles.li}>
              <Link className={`${styles.a} ${textStyles.cinzelDec}`} href={`/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
    )}
    </nav>
  )
}