import OriginalsNav from '@/components/OriginalsNav'
import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import Grid from '@/components/Grid'
import styles from '@/style/artGrid.module.scss'
import textStyles from '@/style/titles.module.scss'
import marginStyle from '@/animation/page.module.scss'

export default async function artOriginals({params}: { params: Promise<{ original: string }> }) {
  const { original } = await params;
    const POSTS_QUERY = `*[
        _type == "original"
        && link.current == "${original}"
        ] 
        {
        "title": title,
        "id": _id,
        "link": link.current,
        "art": art-> { gallery[]{ caption, alt, hotspot{...},  asset-> { assetId, metadata, _id, url } }},
        }`;
  const originalArt = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <section className={styles.gridImg}>
      <header>
        <OriginalsNav 
          navLabel={originalArt[0].link}/>
        <h1 className={`${textStyles.text_center} ${textStyles.cinzelDec} ${marginStyle.margin}`}>Art of {originalArt[0].title}</h1>
      </header>
      <div className={`${marginStyle.margin}`}>
      <div>
        {originalArt[0]?.art?.gallery ?
        <Grid
          photos={originalArt[0].art.gallery}
          />
          :
          <h2>Nothing yet, come back soon.</h2>
        }
      </div>
      </div>
    </section>
  )
}

