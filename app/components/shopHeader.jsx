'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { USER_ACCOUNT_LINK } from '@/lib/stripe'
import Checkout from './checkout'
import ShopNavigation from './shopNav'
import styles from '@/style/shopHeader.module.scss'

export default function ShopHeader() {

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});

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
      {!isMobile&& (<a href={USER_ACCOUNT_LINK}><FontAwesomeIcon icon={faUser} /></a>)}
        <Checkout/>
      </div>
      <ShopNavigation/>
    </header>
  )
}