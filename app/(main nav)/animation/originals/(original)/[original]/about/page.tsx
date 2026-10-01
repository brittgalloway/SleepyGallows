import { type Metadata } from 'next'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import OriginalsNav from '@/components/OriginalsNav'
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

const POSTS_QUERY = (original: string) => `*[
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

const getAboutOriginal = cache(async (original: string) => {
  const originalSanity = await client.fetch<AboutOriginal[]>(POSTS_QUERY(original), {});
  return originalSanity[0];
});

export async function generateMetadata(
  { params }: { params: Promise<{ original: string }> }
): Promise<Metadata> {
  const { original } = await params;
  const orig = await getAboutOriginal(original);

  if (!orig) {
    return {
      title: 'Not Found | Sleepy Gallows',
    };
  }

  const plainSummary = orig.summary
    .map((block) => block.children.map((child:any) => child.text).join(''))
    .join(' ');

  const description = plainSummary.length > 155
    ? plainSummary.slice(0, 155) + '…'
    : plainSummary;

  return {
    title: `About ${orig.title} | Sleepy Gallows | Chicago Animation`,
    description: description || `Learn about ${orig.title} from Sleepy Gallows.`,
  };
}

export default async function aboutOriginal({ params }: { params: Promise<{ original: string }> }) {
  const { original } = await params;
  const orig = await getAboutOriginal(original);

  if (!orig) {
    notFound();
  }

  return (
    <section>
      <header>
        <OriginalsNav 
          navLabel={orig.link}/>
        <h1 className={`${textStyles.text_center} ${textStyles.cinzelDec} ${styles.margin}`}>What is {orig.title}?</h1>
      </header>
        <PortableText value={orig.summary} />
        <h2 className={`${textStyles.text_center }`}>
          Characters
        </h2>
        <div className={`${styles.videoWrapper} ${styles.charactersBlock}`}>
          {orig.characters.gallery.map((character) => (
            <img
              key={character?.asset?.assetId}
              src={character?.asset?.url}
              alt={character?.alt}
              loading="lazy"
            />
          ))}
        </div>
        {orig.hasConceptArt && (
          <div className={`${imgGrid.gridImg} ${styles.margin}`}>
            <h2 className={`${textStyles.text_center} ${textStyles.cinzelDec}`}>
              Concept Art
            </h2>
            <Grid
              photos={orig.conceptArt}
              />
          </div>
        )}
    </section>
  )
}