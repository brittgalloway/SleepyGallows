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
        <Link href='https://sleepygallows.beehiiv.com/'>Join Our Newsletter!</Link>
        <iframe id='kofiframe' 
          src='https://ko-fi.com/sleepygallows/?hidefeed=true&widget=true&embed=true&preview=true' 
          style={{border:'none', width:'60%', minWidth:'300px', maxWidth:'540px', padding:'4px', background:'#fff'}}
          height='712' title='sleepygallows'>
        </iframe>
      </div>
    </main>
  )
}
