import { type Metadata } from 'next'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import OriginalsNav from '@/components/OriginalsNav'
import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import { JsonLd, galleryJsonLd, STUDIO } from '@/lib/jsonLd'
import Grid from '@/components/Grid'
import styles from '@/style/artGrid.module.scss'
import textStyles from '@/style/titles.module.scss'
import marginStyle from '@/animation/page.module.scss'

const POSTS_QUERY = (original: string) => `*[
  _type == "original"
  && link.current == "${original}"
  ] 
  {
  "title": title,
  "id": _id,
  "link": link.current,
  "art": art-> { gallery[]{ caption, alt, hotspot{...},  asset-> { assetId, metadata, _id, url } }},
  }`;

const getOriginalArt = cache(async (original: string) => {
  const originalArt = await client.fetch<SanityDocument[]>(POSTS_QUERY(original), {});
  return originalArt[0];
});

export async function generateMetadata(
  { params }: { params: Promise<{ original: string }> }
): Promise<Metadata> {
  const { original } = await params;
  const orig = await getOriginalArt(original);

  if (!orig) {
    return {
      title: 'Not Found | Sleepy Gallows',
    };
  }

  return {
    title: `Art of ${orig.title} | Sleepy Gallows | Chicago Animation`,
    description: `Browse the art gallery for ${orig.title} by Sleepy Gallows.`
  };
}

export default async function artOriginals({ params }: { params: Promise<{ original: string }> }) {
  const { original } = await params;
  const orig = await getOriginalArt(original);

  if (!orig) {
    notFound();
  }

  return (
    <section className={styles.gridImg}>
      <JsonLd data={galleryJsonLd(`${orig.title} Art`, `/animation/originals/${orig.link}/art`, STUDIO, orig.art?.gallery)} />
      <header>
        <OriginalsNav 
          navLabel={orig.link}/>
        <h1 className={`${textStyles.text_center} ${textStyles.cinzelDec} ${marginStyle.margin}`}>Art of {orig.title}</h1>
      </header>
      <div className={`${marginStyle.margin}`}>
      <div>
        {orig?.art?.gallery ?
        <Grid
          photos={orig.art.gallery}
          />
          :
          <h2>Nothing yet, come back soon.</h2>
        }
      </div>
      </div>
    </section>
  )
}