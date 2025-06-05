import Image from 'next/image'
import Link from 'next/link'
import { cinzel_decorative } from '@/fonts'
import { rgbDataURL } from '@/lib/utils'
import { ANIMATION_IMG, COMICS_IMG, ART_IMG, SHOP_IMG } from '@/lib/data'
import styles from './page.module.scss'

export default function Home() {
  const links = [
    [styles.imgAnimation, 'animation', ANIMATION_IMG, 'Drawing of Harmony, Love, and Tranquility from PLH jumping over an earth attch from Damhan. Clicking here directs you to the animation page.'],
    [styles.imgComic, 'comics', COMICS_IMG, 'Close up on the surprised faces of Anacoana, Necahual, and Quetzalli\'s face\'s (characters from the Comic Necahual) Clicking here directs you to the Comics page.'],
    [styles.imgArt, 'art', ART_IMG, 'Drawing of man floating in space with a ouroboros dragon behind him. Clicking here directs you to the art page.'],
    [styles.imgShop, 'shop', SHOP_IMG, 'Paper collage of a woman leaning on a staircase looking up. Clicking here directs you to Shop page.'],
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
