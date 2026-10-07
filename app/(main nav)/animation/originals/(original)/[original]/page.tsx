import { type SanityDocument } from 'next-sanity'
import { type Metadata } from 'next'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { client } from 'b/sanityLib/client'
import { JsonLd, originalJsonLd, videoObjects } from '@/lib/jsonLd'
import OriginalsNav from '@/components/OriginalsNav'
import Iframe from '@/components/Iframe'
import PreviewVideo from '@/components/PreviewVideo'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

const POSTS_QUERY = `*[
  _type == "original"
  && link.current == $original
] 
{
  "title": title,
  "id": _id,
  "link": link.current,
  "hasVideo": production.hasLiveVideo,
  "inProgress": production.inProduction.asset->url,
  "inProgressType": production.inProduction.asset->mimeType,
  "thumbnailUrl": thumbnail.asset->url,
  "watch": production.watch->{ _id, animation[]{ _key, link, title, year, summary, uploadDate } },
}`;

const getOriginal = cache(async (original: string) => {
  const originalObj = await client.fetch<SanityDocument[]>(POSTS_QUERY, { original });
  return originalObj[0];
});

export async function generateMetadata(
  { params }: { params: Promise<{ original: string }> }
): Promise<Metadata> {
  const { original } = await params;
  const orig = await getOriginal(original);

  if (!orig) {
    return {
      title: 'Not Found | Sleepy Gallows Studio',
    };
  }

  return {
    title: `${orig.title} | Sleepy Gallows Studio | Chicago Animation`,
    description: `Expirence ${orig.title}, a Sleepy Gallows Studio production.`,
  };
}

export default async function watchOriginal({ params }: { params: Promise<{ original: string }> }) {
  const { original } = await params;
  const orig = await getOriginal(original);

  if (!orig) {
    notFound();
  }
  const videos = orig.hasVideo ? videoObjects(orig.watch?.animation, orig.thumbnailUrl) : []
  const pageJsonLd = {
    '@context': 'https://schema.org',
    ...originalJsonLd({ title: orig.title, link: orig.link, thumbnailUrl: orig.thumbnailUrl }),
    ...(videos.length > 0 && { hasPart: videos }),
  }

  return (
    <section style={{display: 'flex', flexDirection: 'column'}}>
      <JsonLd data={pageJsonLd}/>
      <header>
        <OriginalsNav 
          navLabel={orig?.link}/>
        <h1 className={`${textStyles.text_center} ${textStyles.cinzelDec}`}>{orig.title}</h1>
      </header>
      { orig?.hasVideo == true ? (
        <main>
           <div className={styles.videoWrapper}>
              {orig.watch?.animation?.map((video: {
                _key: string
                link: string
                title: string
                year: string
              }) => (
                <div key={video?._key} className={styles.video}>
                  <Iframe 
                    link={video?.link} 
                    title={video?.title} 
                    />
                  <h2 className={`${textStyles.title} ${textStyles.lato} ${textStyles.weightNormal}`}>
                    {video?.title}
                  </h2> 
                  <p className={`${textStyles.title} ${textStyles.lato} ${textStyles.weightNormal}`}>{video?.year}</p>        
                </div>
              ))}
            </div>
        </main>
      ) : (
        <main>
          <h2 className={`${textStyles.text_center} ${textStyles.cinzelDec}`}>
            In Production!
          </h2>
          <h3 className={`${textStyles.text_center} ${textStyles.lato} ${textStyles.weightNormal}`}>
            Coming Soon
          </h3>
          {orig?.inProgress && orig?.inProgressType?.startsWith('video/') &&
            <div style={{'height': '500px'}}>
              <PreviewVideo
                src={orig.inProgress}
                type={orig.inProgressType}
                label={`${orig.title} preview`}
              />
            </div>
          }
        </main> 
        )
      }
    </section>
  )
}