import Image from 'next/image'
import Link from 'next/link'
import { cinzel_decorative } from '@/fonts'
import { rgbDataURL } from '@/lib/utils'
import styles from './page.module.scss'

export default function Home() {
  const links = [
    [styles.imgAnimation, 'animation', 'https://www.datocms-assets.com/53347/1731640769-rectangle1animation.webp', 'Drawing of Harmony, Love, and Tranquility from PLH jumping over an earth attch from Damhan. Clicking here directs you to the animation page.'],
    [styles.imgComic, 'comics', 'https://www.datocms-assets.com/53347/1731640642-rectangle3comics.webp', 'Close up on the surprised faces of Anacoana, Necahual, and Quetzalli\'s face\'s (characters from the Comic Necahual) Clicking here directs you to the Comics page.'],
    [styles.imgArt, 'art', 'https://www.datocms-assets.com/53347/1731640718-rectangle2art.webp', 'Drawing of man floating in space with a ouroboros dragon behind him. Clicking here directs you to the art page.'],
    [styles.imgShop, 'support', 'https://www.datocms-assets.com/53347/1731637581-4shop.webp', 'Paper collage of a woman leaning on a staircase looking up. Clicking here directs you to the support page.'],
  ]
  return (
    <main className={styles.main}>
      {links.map((link, index)=>(
        <Link key={index} href={`/${link[1]}`} className={link[0]}>
          <p className={`${cinzel_decorative.className}`}>{link[1]}</p>
          <Image 
            src={link[2]}
            alt={link[3]}
            width={500}
            height={250}
            placeholder='blur'
            blurDataURL={rgbDataURL(147, 112, 219)}
            loading='lazy'
            />
        </Link>
      ))}

    </main>
  )
}
