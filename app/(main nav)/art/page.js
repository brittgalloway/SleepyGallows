import { cinzel_decorative } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'
import MainNavigation from '@/app/components/MainNavigation'

export default function Art() {
  return (
    <>
      <MainNavigation/>
      <main className={styles.main}>
          <Link className={styles.a} href="/art/illustration">
              <p className={`${styles.p} ${cinzel_decorative.className}`} >Crystal</p>
              <Image 
                className={styles.img}
                src="https://www.datocms-assets.com/53347/1629472253-crystalsart.svg" 
                alt="Link to Crystal's art. Drawing of Baby Harmony and His Parents" 
                width={700}
                height={1000}
                />
            </Link>
            <Link className={styles.a} href="/art/drawings">
              <p className={`${styles.p} ${cinzel_decorative.className}`}>Brittney</p>
              <Image 
                className={styles.brittney}
                src="https://www.datocms-assets.com/53347/1629472435-brittneysart.svg"
                alt="Link to Brittney's art. Drawing of a woman in a blue patterned dress and a headwrap"
                width={700}
                height={1000}
                />
            </Link>
      </main>
    </>
  )
}