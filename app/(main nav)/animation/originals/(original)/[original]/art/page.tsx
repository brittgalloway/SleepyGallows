import { cinzel_decorative } from '@/fonts'
import Grid from '@/components/Grid'
import OriginalsNav from '@/components/OriginalsNav'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../../../../sanity/lib/client'
import styles from '@/style/artGrid.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Art of PLH',
  description: "For Peace, Love, & Harmony is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.",
  keywords: "animation, sleepy gallows, for peace love and harmony",
}

export default async function artOriginals({params}) {
    const POSTS_QUERY = `*[
        _type == "original"
        && link.current == "${params.original}"
        ] 
        {
        "title": title,
        "id": _id,
        "link": link.current,
        "art": art.charaters._ref,
        }`;
  const original = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <section className={styles.gridImg}>
      <header>
        <OriginalsNav 
          navLabel={original[0].link}/>
        <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>Art of {original[0].title}</h1>
      </header>
      <div>
        {/* <Grid
          photos={original[0].art}
          name={'image2'}
          /> */}
      </div>
    </section>
  )
}

