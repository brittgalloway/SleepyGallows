import { cinzel_decorative } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
        <Link href="/animation" className={styles.a}>
          <p className={`${styles.animationP} ${cinzel_decorative.className}`}>Animation</p>
          <Image 
            className={styles.topImg}
            src="https://www.datocms-assets.com/53347/1628108199-rectangle1animation.png" 
            alt="Drawing of Harmony, Love, and Tranquility from PLH jumping over an earth attch from Damhan. Clicking here directs you to the animation page."
            width={500}
            height={250}
            priority
            />
        </Link>
        <Link href="/comics" className={styles.a}>
          <p className={`${styles.comicsP} ${cinzel_decorative.className}`}>comics</p>
          <Image 
            className={styles.topImg}
            src="https://www.datocms-assets.com/53347/1628108650-rectangle3comics.png" 
            alt="Close up on the surprised faces of Anacoana, Necahual, and Quetzalli's face's (characters from the Comic Necahual) Clicking here directs you to the Comics page."
            width={500}
            height={250}
            priority
            />
        </Link>
        <Link href="/art" className={styles.a}>
          <p className={`${styles.artP} ${cinzel_decorative.className}`}>Art</p>
          <Image  
            className={styles.img}
            src="https://www.datocms-assets.com/53347/1628108278-rectangle2art.png" 
            alt="Drawing of man floating in space with a ouroboros dragon behind him. Clicking here directs you to the art page."
            width={500}
            height={250}
            priority
            />
        </Link>
        <Link href="/shop" className={styles.a}>
          <p className={`${styles.shopP} ${cinzel_decorative.className}`}>Shop</p>
          <Image 
            className={styles.img}
            src="https://www.datocms-assets.com/53347/1698643042-4shop_home.png" 
            alt="Screenshot of the web page 'Space Chasers' with light cyan blues and purlpes as the primary colors and shpes. Clicking here directs you to the Shop page."
            width={500}
            height={250}
            priority
            />
        </Link>
    </main>
  )
}
