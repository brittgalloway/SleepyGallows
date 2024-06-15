import { ProductCategory } from '../components/productCategory'
import styles from './page.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Shop',
  description: "The Sleepy Gallows e-commerce store. Browse Collages, Prints, Stickers, and Books",
  keywords: "shop, art, art prints, sleepy gallows",
}

export default function Shop() {

  return (
    <main className={styles.main}>
      <div className={`${styles.welcome}`}>
        <p>Welcome to our whimsical world of art and wonder. Explore charming fine art, adorable prints, captivating children&apos;s books, and cute downloadable assets, all crafted to ignite your imagination and fill your world with magic.</p>
      </div>
      <ProductCategory/>
    </main>
  )
}