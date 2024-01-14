import { cinzel_decorative } from '@/app/fonts'
import styles from './page.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Shop',
  description: "The Sleepy Gallows e-commerce store. Soon to launch, for now sign up for the newsletter",
  keywords: "shop, art, art prints, sleepy gallows",
  author:"Brittney Galloway",
}

export default function Shop() {
  return (
    <main className={styles.main}>
      <h1 className={`${styles.h1} ${cinzel_decorative.className}`}>Coming Late 2024</h1>
      <h2 className={styles.h2}>Don&apos;t miss the launch!</h2>
      <iframe className={styles.iframe} src='https://embeds.beehiiv.com/3178b493-940a-49e7-a1e0-c7095d94b9db?slim=true' frameBorder={0} data-test-id='beehiiv-embed' ></iframe>
    </main>
  )
}