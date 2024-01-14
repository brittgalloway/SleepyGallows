import { cinzel_decorative } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'

export default function Animation() {
  return (
    <main className={styles.main}> 
      <Link className={styles.original} href="/animation/originals">
        <p className={`${styles.p} ${cinzel_decorative.className}`}>Originals</p>
        <Image 
        className={styles.imgOriginal}
        src="https://www.datocms-assets.com/53347/1629471501-originals.jpg" 
        alt="Link to Original animations page. Nirvana sitting on the branch" 
        width={900}
        height={300}
        />
      </Link>
      <Link className={styles.client} href="/animation/client">
        <p className={`${styles.p} ${cinzel_decorative.className}`}>Client Work</p>
        <Image 
        className={styles.img}
        src="https://www.datocms-assets.com/53347/1705189962-inhuman-figures.jpg" 
        alt='Futuristic city scape with high rises and flying cars with the text "Robots Clones Aliens"'
        width={900}
        height={300}
        />
      </Link>
      <Link className={styles.fun} href="/animation/fun">
        <p className={`${styles.p} ${cinzel_decorative.className}`}>For Fun</p>
        <Image 
        className={styles.img}
        src="https://www.datocms-assets.com/53347/1630810673-crushsm.png" 
        alt="Link to page of short fun animations. This is a drawing of Yuna inspired by her Chapters album visuals" 
        width={900}
        height={300}
        />
      </Link>
    </main>
  )
}
