import { cinzel_decorative } from '@/fonts'
import styles from './page.module.scss'
import Link from 'next/link'

export const metadata = {
  title: 'Sleepy Gallows Studio | Shop',
  description: "The Sleepy Gallows e-commerce store. Soon to launch, for now sign up for the newsletter",
  keywords: "shop, art, art prints, sleepy gallows",
}

export default function Shop() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={`${styles.h1} ${cinzel_decorative.className}`}>Ways to support us!</h1>
        <ul>
          <li>
            <Link href='https://ko-fi.com/sleepygallows'>Visit the Ko-fi!</Link>        
          </li>
          <li>
            <Link href='https://sleepygallows.beehiiv.com/'>Join Our Newsletter!</Link>
          </li>
        </ul>
      </div>
        
    </main>
  )
}
