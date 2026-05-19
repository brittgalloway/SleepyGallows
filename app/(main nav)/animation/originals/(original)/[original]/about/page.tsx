import OriginalsNav from '@/components/OriginalsNav'
import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import Grid from '@/components/Grid'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'
import imgGrid from '@/style/artGrid.module.scss'


export default async function aboutOriginal({ params }: { params: Promise<{ original: string }> }) {
  const { original } = await params;
  const POSTS_QUERY = `*[
      _type == "original"
      && link.current == "${original}"
    ] 
    {
      "title": title,
      "id": _id,
      "link": link.current,
      "summary": about.summary[0].children[0].text,
      "characters": about.characters-> { gallery[]{ alt, hotspot{...},  asset-> { assetId, url } } },
      "hasConceptArt": about.hasConceptArt,
      "conceptArt": about.conceptArt[].gallery[]{ caption, alt, hotspot{...},  asset-> { assetId, metadata, _id, url } }
    }`;
  const originalSanity = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  const originalData = originalSanity[0];
  return (
    <section>
      <header>
        <OriginalsNav 
          navLabel={originalData.link}/>
        <h1 className={`${textStyles.text_center} ${textStyles.cinzelDec} ${styles.margin}`}>What is {originalData.title}?</h1>
      </header>
        <p className={`${styles.margin}`}>{originalData.summary}</p>
        <h2 className={`${textStyles.text_center} ${textStyles.cinzelDec} ${styles.margin}`}>
          Characters
        </h2>
        <div className={`${styles.videoWrapper} ${styles.charactersBlock}`}>
          {originalData.characters.gallery.map((character: {
            alt: string
            asset: { assetId: string; url: string }
          }) => (
            <img
              key={character?.asset?.assetId}
              src={character?.asset?.url}
              alt={character?.alt}
              loading="lazy"
            />
          ))}
        </div>
        {originalData.hasConceptArt && (
          <div className={`${imgGrid.gridImg} ${styles.margin}`}>
            <h2 className={`${textStyles.text_center} ${textStyles.cinzelDec}`}>
              Concept Art
            </h2>
            <Grid
              photos={originalData.conceptArt}
              />
          </div>
        )}
    </section>
  )
}