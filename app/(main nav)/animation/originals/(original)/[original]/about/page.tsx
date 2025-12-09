import { cinzel_decorative } from '@/fonts'
import OriginalsNav from '@/components/OriginalsNav'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../../../../sanity/lib/client'
import ImageComponent from '@/components/sanityImage'
import Grid from '@/components/Grid'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'
import imgGrid from '@/style/artGrid.module.scss'


export default async function aboutOriginal({params}) {
  const { original } = params;
  const POSTS_QUERY = await `*[
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
        <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>What is {originalData.title}?</h1>
      </header>
        <p dangerouslySetInnerHTML={{ __html: originalData.summary }}/>
        <h2 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>
          Characters
        </h2>
        <div className={`${styles.videoWrapper} ${styles.charactersBlock}`}>
          {originalData.characters.gallery.map((character)=> 
           (
            <ImageComponent
              key={character?.asset?.assetId}
              image={character?.asset?.url}
              altText={character?.alt}
              />
          ))}
        </div>
        {originalData.hasConceptArt && (
          <div className={imgGrid.gridImg}>
            <h2 className={`${textStyles.textCenter} ${cinzel_decorative.className}`}>
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

