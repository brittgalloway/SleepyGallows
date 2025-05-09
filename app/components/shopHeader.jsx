'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
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
          <a className={styles.icons} href='https://www.youtube.com/@sleepygallows'><svg xmlns="http://www.w3.org/2000/svg" width="22.5" height="20" viewBox="0 0 576 512"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg></a>
          <a className={styles.icons} href='https://www.instagram.com/sleepy_gallows/'><svg id="instagram-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></a>
        </div>
        )}
        <div>
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
      {!isMobile && (<a href={USER_ACCOUNT_LINK} style={{marginBlock: '1rem'}}><svg id="user-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="20" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg></a>)}
        <Checkout/>
      </div>
      <ShopNavigation/>
    </header>
  )
}