'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faCartShopping, faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons'
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
          <a href='https://www.youtube.com/@sleepygallows'><FontAwesomeIcon icon={faYoutube} /></a>
          <a href='https://www.instagram.com/sleepy_gallows/'><FontAwesomeIcon icon={faInstagram} /></a>
        </div>
        )}
        <div className={styles.logo_wrapper}>
        {isMobile && 
          <Link href={'/shop/'} aria-label='This link takes you back to the Shop&apos;s home page. It holds the Sleepy Gallows "SG"'>
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
        {!isMobile&& (<span><FontAwesomeIcon icon={faUser} /></span>)}
          <span className={styles.checkout}><FontAwesomeIcon icon={faBagShopping} /></span>
        </div>
      <ShopNavigation/>
    </header>
  )
}