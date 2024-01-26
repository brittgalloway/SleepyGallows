'use client'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import Link from 'next/link'

export default function ShopNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});
  function handleClick() {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  }

  return(
    // <nav aria-label='Main' className={isMobile && isOpen ? `${styles.mobile} ${styles.nav}` : styles.nav} onClick={handleClick}>
    <nav>
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
        <ul aria-label="Shop Menu">
          <li><Link href="/collage">collage</Link></li>
          <li><Link href="/prints">prints</Link></li>
          <li><Link href="/books">books</Link></li>
          <li><Link href="/downloadables">Downloadables</Link></li>
          <li><Link href="/patron">patron</Link></li>
          {isMobile && 
              <li>
                  <Link href="#">Account</Link>
              </li>
          }
        </ul>
      )}
    </nav>
  )
}