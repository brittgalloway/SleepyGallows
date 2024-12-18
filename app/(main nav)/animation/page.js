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
  const links = [
    ['Originals', styles.original, styles.imgOriginal, 'originals', 'https://www.datocms-assets.com/53347/1731641471-originals.webp', 'Link to Original animations page. Nirvana sitting on the branch'],
    ['Client Work', styles.client, styles.img, 'client', 'https://www.datocms-assets.com/53347/1731641033-inhuman-figures.webp', 'Futuristic city scape with high rises and flying cars with the text "Robots Clones Aliens"'],
    ['For Fun', styles.fun, styles.img, 'fun', 'https://www.datocms-assets.com/53347/1731641125-crushsm.webp', 'Link to page of short fun animations. This is a drawing of Yuna inspired by her Chapters album visuals'],
  ];
  return (
    <main className={styles.main}> 
    {links.map((link, index)=> (
      <Link key={index} className={link[1]} href={`/animation/${link[3]}`}>
        <p className={`${styles.p} ${cinzel_decorative.className}`}>{link[0]}</p>
        <Image 
        className={link[2]}
        src={link[4]} 
        alt={link[5]}
        width={900}
        height={300}
        placeholder='blur'
        blurDataURL={rgbDataURL(228, 220, 243)}
        loading='lazy'
        />
      </Link>
    ))}
    </main>
  )
}
