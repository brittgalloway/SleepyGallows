'use client'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import Link from 'next/link'
import ShopNavigation from './shopNav'
import styles from '@/app/style/shopHeader.module.scss'

export default function ShopHeader() {

  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery({query: `(max-width: 830px)`});

  function handleClick() {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  }


  return(
    <header className={styles.header}>
      <div className={styles.wrapper}>
      {!isMobile && (
        <div>
          <a href='https://www.youtube.com/@sleepygallows'>YT</a>
          <a href='https://www.instagram.com/sleepy_gallows/'>IG</a>
        </div>
        )}
        <div className={styles.logo_wrapper}>
        {isMobile && 
          <Link href={'/shop/'}>
            <Image 
            className="logo" 
            width={82} 
            height={61} 
            src="/sg_logo.svg" 
            alt="sleepy gallows logo"
            />
          </Link>
            }
      {!isMobile&& (
        <h1 className={styles.h1}><Link href='/shop/'>Sleepy Gallows&apos; Shop</Link></h1>
        )}
          <p>Take some of the Magic with you</p>
        </div>
        {!isMobile&& (<span>account</span>)}
          <span className={styles.checkout}>CO</span>
        </div>
      <ShopNavigation/>
    </header>
  )
}