'use client'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import ShopNavigation from './shopNav'
import Link from 'next/link'
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
        <span>Youtube Insta</span>
        <div>
        {isMobile && 
              <Image 
              className="logo" 
              width={82} 
              height={61} 
              src="/sg_logo.svg" 
              alt="sleepy gallows logo"
              />
            }
      {!isMobile&& (
        <h1 className={styles.h1}>Sleepy Gallows&apos; Shop</h1>
        )}
          <p>Take some of the Magic with you</p>
        </div>
          <span>account checkout</span>
        </div>
      <ShopNavigation/>
    </header>
  )
}