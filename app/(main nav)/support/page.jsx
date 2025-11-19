import styles from './page.module.scss'
import Link from 'next/link'
import { KOFI, NEWSLETTER } from '@/lib/data'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Shop',
  description: 'The Sleepy Gallows e-commerce store. Soon to launch, for now sign up for the newsletter',
  keywords: 'shop, art, art prints, sleepy gallows, chicago artist, evanston artist, black artist',
}

export default function Shop() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={`${styles.h1} ${textStyles.cinzelDec}`}>Ways to support us!</h1>
        <ul>
          <li>
            <Link href={KOFI}>Visit the Ko-fi!</Link>        
          </li>
          <li>
            <Link href={NEWSLETTER}>Join Our Newsletter!</Link>
          </li>
        </ul>
      </div>
        
    </main>
  )
}
