import { cinzel_decorative } from '@/fonts'
import Image from 'next/image'
import { rgbDataURL } from '@/lib/utils'
import { INSTA_2HEROES, TWITTER_2HEROES, PATREON_2HEROES, NECAHUAL, WEBTOON, NECAHUAL1_IMG, NECAHUAL2_IMG, NECAHUAL3_IMG, NECAHUAL4_IMG } from '@/lib/data'
import { Footer } from '@/components/Footer'
import styles from './page.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | 2Heroes',
  description: 'The comics of 2Heros - Crystal Galloway and Serigo Silva. Currently producing the comic Necahual.',
  keywords: 'comics, manga, Necahual, meso-american, magical girls, chicago artist, evanston artist, black artist',
  author:'Crystal Galloway',
}

export default function Comics() {
  const links = [
    ['instagram', INSTA_2HEROES],
    ['twitter', TWITTER_2HEROES],
    ['patreon', PATREON_2HEROES],
  ];
  return (
    <>
      <main className={styles.main}>
        <article>
          <h1 className={`${styles.h1} ${cinzel_decorative.className}`}>2Heroes</h1>
          <div className={styles.links}>
              <ul className={styles.ul}>
                {links.map((link, index)=> (
                  <li key={index}>
                    <a href={link[1]}>{link[0]}</a>
                  </li>
                ))}
              </ul>
            </div>
            <section className={styles.section}>
            <p>
              Come join us on our first journey with Necahual, Quetzalli, and Anacoana as they discover their destiny and help save their people. <a href={WEBTOON}>NECAHUAL</a> is a new and refreshing take on the magical trope that also honors Meso-American cultures. Subscribe to the <a href={WEBTOON}>WEBTOON</a> and never miss an update!
            </p>
            <div className={styles.image}>
              <Image 
                src={NECAHUAL1_IMG} 
                alt='Necahual, Quetzalli, and Anacaona lounging together'
                width={349}
                height={349}
                placeholder='blur'
                blurDataURL={rgbDataURL(228, 220, 243)}
                loading='lazy'
              />
            </div>
          </section>
        </article>
        <article>
          <h3>Already a Fan?</h3>
          <p className={styles.p}>
            Find Stickers, Buttons, Charms, and Prints at <a href={NECAHUAL}>CandyFluffs.com</a>
          </p>
          <small>
            Patreon supporters get 15% off everything in the store
          </small>
          <div className={styles.products}>
            <Image 
            src={NECAHUAL2_IMG} 
            alt='Necahual Charms found at candyfluffs.com/2heroes'
            width={200}
            height={200}
            placeholder='blur'
            blurDataURL={rgbDataURL(228, 220, 243)}
            loading='lazy'
            />
            <Image 
            src={NECAHUAL3_IMG} 
            alt='The handmade Necahual Art book  found at candyfluffs.com/2heroes'
            width={200}
            height={200}
            placeholder='blur'
            blurDataURL={rgbDataURL(228, 220, 243)}
            loading='lazy'
            />
            <Image 
            src={NECAHUAL4_IMG} 
            alt='The handmade Necahual Stickers found at candyfluffs.com/2heroes'
            width={200}
            height={200}
            placeholder='blur'
            blurDataURL={rgbDataURL(228, 220, 243)}
            loading='lazy'
            />
          </div>
        </article>
        <article>
          <h2 className={`${styles.h1} ${cinzel_decorative.className}`}>The Creators</h2>
          <p className={styles.p}>
            Serigio (the writer) and Crystal (the artist) met at a networking session at C2E2 in Chicago 2017. They became fast friends and have been working together ever since.
          </p>
        </article>
      </main>
      <Footer
      name={'2Heroes'}
      />
    </>
  )
}