import Link from 'next/link'
import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import ImageComponent from '@/components/sanityImage'
import AnimationNav from '@/components/Nav'
import { Footer } from '@/components/Footer'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Originals',
  description: 'Original Animation created by the Sleepy Gallows. Browse our short films and webseries.',
  keywords: 'animation, sleepy gallows, for peace love and harmony, elusive green elephant, chicago artist, evanston artist, black artist',
}

const POSTS_QUERY = `*[
  _type == "original"
  ] 
  {
    "title": title,
    "id": _id,
    "link": link.current,
    "thumbnail": thumbnail.asset._ref,
 }`;
 
export default async function Originals() {
  const originals = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <>
      <main> 
        <header>
          <AnimationNav/>
          <h1 className={`${textStyles.text_center } ${textStyles.cinzelDec}`}>Originals</h1>
          <h2 className={`${textStyles.text_center }`}>SG Shorts and Webseries</h2>
        </header>
        <div className={styles.projectWrapper}>
          {originals.map((original)=> {
          return(
            <div key={original?.id} className={styles.project}>
              <Link href={`/animation/originals/${original?.link}`}
                aria-label={`Click here for more information on ${original?.title}`}> 
                <ImageComponent
                  image={original?.thumbnail}
                  altText={original?.title}
                  />
              </Link>
            </div>
          )}
          )}
        </div>
      </main>
      <Footer
      name={'Sleepy Gallows'}
      />
    </>
  )
}

