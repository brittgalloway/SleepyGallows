import { cinzel_decorative } from '@/fonts'
import { PortableText } from '@portabletext/react'
import OriginalsNav from '@/components/OriginalsNav'
import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import Grid from '@/components/Grid'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'
import imgGrid from '@/style/artGrid.module.scss'

type AboutOriginal = {
  title: string
  id: string
  link: string
  summary: any[] // Portable Text block array
  characters: {
    gallery: {
      alt: string
      asset: { assetId: string; url: string }
    }[]
  }
  hasConceptArt: boolean
  conceptArt: {
    caption: string
    alt: string
    asset: { assetId: string; metadata: unknown; _id: string; url: string }
  }[]
}

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
      "summary": about.summary,
      "characters": about.characters-> { gallery[]{ alt, hotspot{...},  asset-> { assetId, url } } },
      "hasConceptArt": about.hasConceptArt,
      "conceptArt": about.conceptArt[].gallery[]{ caption, alt, hotspot{...},  asset-> { assetId, metadata, _id, url } }
    }`;
  const originalSanity = await client.fetch<AboutOriginal[]>(POSTS_QUERY, {});
  const originalData = originalSanity[0];
  return (
    <section>
      <header>
        <OriginalsNav 
          navLabel={originalData.link}/>
        <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>What is {originalData.title}?</h1>
      </header>
        <PortableText value={originalData.summary} />
        <h2 className={`${textStyles.textCenter }`}>
          Characters
        </h2>
        <div className={`${styles.videoWrapper} ${styles.charactersBlock}`}>
          {originalData.characters.gallery.map((character) => (
            <img
              key={character?.asset?.assetId}
              src={character?.asset?.url}
              alt={character?.alt}
              loading="lazy"
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