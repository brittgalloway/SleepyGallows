import Image from 'next/image'
import Link from 'next/link'
import { cinzel_decorative } from '@/fonts'
import { rgbDataURL } from '@/lib/utils'
import styles from './page.module.scss'
import MainNavigation from '@/components/MainNavigation'

export const metadata = {
  title: 'Sleepy Gallows Studio | Art',
  description: "Showcase the art of Brittney and Crystal Galloway.",
  keywords: "brittney galloway, crystal galloway, art, necahual, elusive green elephant, plh",
}

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
                placeholder='blur'
                blurDataURL={rgbDataURL(228, 220, 243)}
                loading='lazy'
                />
            </Link>
            <Link className={styles.a} href="/art/drawings">
              <p className={`${styles.p} ${cinzel_decorative.className}`}>Brittney</p>
              <Image 
                className={styles.img}
                src="https://www.datocms-assets.com/53347/1629472435-brittneysart.svg"
                alt="Link to Brittney's art. Drawing of a woman in a blue patterned dress and a headwrap"
                width={700}
                height={1000}
                placeholder='blur'
                blurDataURL={rgbDataURL(228, 220, 243)}
                loading='lazy'
                />
            </Link>
      </main>
    </>
  )
}