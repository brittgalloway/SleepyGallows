import { cinzel_decorative } from '@/fonts'
import OriginalsNav from '@/components/OriginalsNav'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../../../../sanity/lib/client'
import Grid from '@/components/Grid'
import styles from '@/style/artGrid.module.scss'
import textStyles from '@/style/titles.module.scss'

export default async function artOriginals({params}) {
  const { original } = await params
    const POSTS_QUERY = `*[
        _type == "original"
        && link.current == "${original}"
        ] 
        {
        "title": title,
        "id": _id,
        "link": link.current,
        "art": art-> { gallery[]{ asset-> { assetId, altText, metadata, _id, url } } },
        }`;
  const originalArt = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <section className={styles.gridImg}>
      <header>
        <OriginalsNav 
          navLabel={originalArt[0].link}/>
        <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>Art of {originalArt[0].title}</h1>
      </header>
      <div>
        <Grid
          photos={originalArt[0].art.gallery}
          name={'asset'}
          />
      </div>
    </section>
  )
}

