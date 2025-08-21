import { cinzel_decorative } from '@/fonts'
import Grid from '@/components/Grid'
import OriginalsNav from '@/components/OriginalsNav'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../../../../sanity/lib/client'
import styles from '@/style/artGrid.module.scss'
import textStyles from '@/style/titles.module.scss'

export default async function artOriginals({params}) {
    const POSTS_QUERY = await `*[
        _type == "original"
        && link.current == "${params.original}"
        ] 
        {
        "title": title,
        "id": _id,
        "link": link.current,
        "art": art.characters._ref,
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
        not yet connected
        {/* <Grid
          photos={original[0].art}
          name={'image2'}
          /> */}
      </div>
    </section>
  )
}

