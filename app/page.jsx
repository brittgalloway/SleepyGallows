import { cinzel_decorative } from './fonts'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'

export default function Home() {
  const links = [
    [styles.topImg, 'animation', 'https://www.datocms-assets.com/53347/1628108199-rectangle1animation.png', 'Drawing of Harmony, Love, and Tranquility from PLH jumping over an earth attch from Damhan. Clicking here directs you to the animation page.', styles.animationP],
    [styles.topImg, 'comics', 'https://www.datocms-assets.com/53347/1628108650-rectangle3comics.png', 'Close up on the surprised faces of Anacoana, Necahual, and Quetzalli\'s face\'s (characters from the Comic Necahual) Clicking here directs you to the Comics page.', styles.comicsP],
    [styles.img, 'art', 'https://www.datocms-assets.com/53347/1628108278-rectangle2art.png', 'Drawing of man floating in space with a ouroboros dragon behind him. Clicking here directs you to the art page.', styles.artP],
    [styles.img, 'shop', 'https://www.datocms-assets.com/53347/1719083004-4shop.png', 'Paper collage of a woman leaning on a staircase looking up. Clicking here directs you to Shop page.', styles.shopP],
  ]
  return (
    <main className={styles.main}>
      {links.map((link, index)=>(
        <Link key={index} href={`/${link[1]}`} className={styles.a}>
          <p className={`${link[4]} ${cinzel_decorative.className}`}>{link[1]}</p>
          <Image 
            className={link[0]}
            src={link[2]}
            alt={link[3]}
            width={500}
            height={250}
            priority
            />
        </Link>
      ))}

    </main>
  )
}
