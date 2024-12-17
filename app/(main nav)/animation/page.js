import Image from 'next/image'
import Link from 'next/link'
import { cinzel_decorative } from '@/fonts'
import { rgbDataURL } from '@/lib/utils'
import styles from './page.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Animation',
  description: "Animation of the Sleepy Gallows.",
  keywords: "animation, sleepy gallows, brittney",
}

export default function Animation() {
<<<<<<< HEAD
=======
  const links = [
    ['Originals', styles.original, styles.imgOriginal, 'originals', 'https://www.datocms-assets.com/53347/1731641471-originals.webp', 'Link to Original animations page. Nirvana sitting on the branch'],
    ['Client Work', styles.client, styles.img, 'client', 'https://www.datocms-assets.com/53347/1731641033-inhuman-figures.webp', 'Futuristic city scape with high rises and flying cars with the text "Robots Clones Aliens"'],
    ['For Fun', styles.fun, styles.img, 'fun', 'https://www.datocms-assets.com/53347/1731641125-crushsm.webp', 'Link to page of short fun animations. This is a drawing of Yuna inspired by her Chapters album visuals'],
  ];
>>>>>>> e1f30c71b7294fc95819aa5a4666063eb4d0bad9
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
        placeholder='blur'
        blurDataURL={rgbDataURL(228, 220, 243)}
        loading='lazy'
        />
      </Link>
<<<<<<< HEAD
=======
    ))}
>>>>>>> e1f30c71b7294fc95819aa5a4666063eb4d0bad9
    </main>
  )
}
