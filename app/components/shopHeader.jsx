'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Checkout from './Checkout'
import ShopNavigation from './shopNav'
import styles from '@/style/shopHeader.module.scss'

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
        <div style={{marginBlock: '1rem'}}>
          <a className={styles.icons} href='https://www.youtube.com/@sleepygallows'><FontAwesomeIcon icon={faYoutube} /></a>
          <a className={styles.icons} href='https://www.instagram.com/sleepy_gallows/'><FontAwesomeIcon icon={faInstagram} /></a>
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
        {!isMobile&& (<a href='https://billing.stripe.com/p/login/test_dR615302V1Hz1K8fYY'><FontAwesomeIcon icon={faUser} /></a>)}
        {/* {!isMobile&& (<a href='https://billing.stripe.com/p/login/aEU16L6Aq6EP7yE000'><FontAwesomeIcon icon={faUser} /></a>)} */}
          <Checkout/>
        </div>
      <ShopNavigation/>
    </header>
  )
}