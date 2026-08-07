import { cinzel_decorative } from '@/fonts'
import { ProductCategory } from '@/components/productCategory'
import styles from './page.module.scss'

export const metadata = {
  title: 'Shop Art | Sleepy Gallows | Chicago',
  description: 'Browse collages, art prints, and stickers. Find wall art from For Peace, Love and Harmony, the Elusive Green Elephant and more.',
}

export default function Shop() {

  return (
    <main className={styles.main}>
      <div className={`${styles.welcome}`}>
      <div className={`${styles.decor}`} aria-hidden="true"></div>
        <p><span style={cinzel_decorative.style}>W</span>elcome to our whimsical world of art and wonder. Explore charming fine art, prints, and stickers all crafted to ignite your imagination and fill your world with magic.</p>
      </div>
      <ProductCategory/>
    </main>
  )
}