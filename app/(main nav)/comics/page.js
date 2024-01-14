import { cinzel_decorative } from '@/app/fonts'
import Image from 'next/image'
import { Footer } from '@/app/components/footer'
import styles from './page.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | 2Heroes',
  description: "The comics of 2Heros - Crystal Galloway and Serigo Silva. Currently producing the comic Necahual.",
  keywords: "comics, manga, Necahual, meso-american, magical girls",
  author:"Crystal Galloway",
}

export default function Comics() {
  return (
    <>
      <main className={styles.main}>
          <article>
          <h1 className={`${styles.h1} ${cinzel_decorative.className}`}>2Heroes</h1>
          <div className={styles.links}>
              <ul className={styles.ul}>
                <li >
                  <a href="https://www.instagram.com/2.heroes/">instagram</a>
                </li>
                <li>
                  <a href="https://twitter.com/2Heroes1">twitter</a>
                </li>
                <li>
                  <a href="https://www.patreon.com/2heroes">patreon</a>
                </li>
              </ul>
            </div>
          <section className={styles.section}>
            <p>
              Come join us on our first journey with Necahual, Quetzalli, and Anacoana as they discover their destiny and help save their people. <a href="https://www.webtoons.com/en/challenge/necahual/a-peaceful-day/viewer?title_no=216820&episode_no=1">NECAHUAL</a> is a new and refreshing take on the magical trope that also honors Meso-American cultures. Subscribe to the <a href="https://www.webtoons.com/en/challenge/necahual/a-peaceful-day/viewer?title_no=216820&episode_no=1">WEBTOON</a> and never miss an update!
            </p>
            <div className={styles.image}>
              <Image 
                src='https://www.datocms-assets.com/53347/1705187376-necamasterpiece-small.gif' 
                alt='Necahual, Quetzalli, and Anacaona lounging together'
                width={349}
                height={349}
              />
            </div>
          </section>
        </article>
        <article>
          <h3>Already a Fan?</h3>
          <p className={styles.p}>
            Find Stickers, Buttons, Charms, and Prints at <a href="https://candyfluffs.com/2heroes">CandyFluffs.com</a>
          </p>
          <small>
            Patreon supporters get 15% off everything in the store
          </small>
          <div className={styles.products}>
            <Image 
            src='https://www.datocms-assets.com/53347/1628171910-necacharms.jpg' 
            alt='Necahual Charms found at candyfluffs.com/2heroes'
            width={200}
            height={200}
            />
            <Image 
            src='https://www.datocms-assets.com/53347/1628171809-necaminicomics.jpg' 
            alt='The handmade Necahual  Art book  found at candyfluffs.com/2heroes'
            width={200}
            height={200}
            />
            <Image 
            src='https://www.datocms-assets.com/53347/1628171977-necastickers.jpg' 
            alt='The handmade Necahual  Stickers found at candyfluffs.com/2heroes'
            width={200}
            height={200}
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