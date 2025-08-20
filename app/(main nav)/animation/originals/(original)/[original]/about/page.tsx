import Image from 'next/image'
import { cinzel_decorative } from '@/fonts'
import OriginalsNav from '@/components/OriginalsNav'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../../../../sanity/lib/client'
import { rgbDataURL } from '@/lib/utils'
import Grid from '@/components/Grid'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | About EGE',
  description: "The Elusive Green Elephant is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.",
  keywords: "animation, sleepy gallows, elusive green elephant",
}


export default async function aboutOriginal({params}) {
    const POSTS_QUERY = `*[
        _type == "original"
        && link.current == "${params.original}"
        ] 
        {
        "title": title,
        "id": _id,
        "link": link.current,
        "summary": about.summary[0].children[0].text,
        "characters": about.charaters._ref,
        "hasConceptArt": about.hasConceptArt,
        "conceptArt": about.conceptArt._ref,
        }`;
    const original = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <section>
      <header>
        <OriginalsNav 
          navLabel={original[0].link}/>
        <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>What is {original[0].title}?</h1>
      </header>
        <p dangerouslySetInnerHTML={{ __html: original[0].summary }}/>
        <h2 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>
          Characters
        </h2>
        <div className={styles.videoWrapper}>
          {/* {original[0].about.map(({character})=> (
              <div key={character.id}>
                <Image 
                  width={300}
                  height={300}
                  src={character.url} alt={character.alt}
                  placeholder='blur'
                  blurDataURL={rgbDataURL(228, 220, 243)}
                  loading='lazy'/>
              </div>
          ))} */}
        </div>
        {original[0].hasConceptArt && (
          <>
            <h2 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>
              Concept Art
            </h2>
            <Grid
              photos={original[0].conceptArt}
              name={''}
              />
          </>
        )}
    </section>
  )
}

