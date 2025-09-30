import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../../../sanity/lib/client'
import { cinzel_decorative } from '@/fonts'
import OriginalsNav from '@/components/OriginalsNav'
import  Iframe  from '@/components/Iframe'
import Animation from '@/components/rive'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'


export default async function watchOriginal({params}) {
  const { originalDynamic } = await params;
  const POSTS_QUERY = await `*[
    _type == "original"
    && link.current == "${originalDynamic}"
  ] 
  {
    "title": title,
    "id": _id,
    "link": link.current,
    "hasVideo": production.hasLiveVideo,
    "inProgress": production.inProduction.asset->url,
    "watch": production.watch->{ _id, animation[]{link, title,year} },
  }`;
    const original = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <section style={{display: 'flex', flexDirection: 'column'}}>
      <header>
        <OriginalsNav 
          navLabel={original[0]?.link}/>
        <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>{original[0].title}</h1>
      </header>
      { original[0]?.hasVideo == true ? (
        <main>
           <div className={styles.videoWrapper}>
              {original[0].watch.animation.map((video)=> (
                <div key={video?._id} className={styles.video}>
                  <Iframe 
                    link={video?.link} 
                    title={video?.title} 
                    />
                  <h2 className={textStyles.title}>
                    {video?.title}
                  </h2> 
                  <p className={textStyles.title}>{video?.year}</p>        
                </div>
              ))}
            </div>
        </main>
      ) : (
        <main>
          <h2 className={`${textStyles.textCenter }`}>
            In Production!
          </h2>
          <h3 className={`${textStyles.textCenter }`}>
            Coming Soon
          </h3>
          <div style={{'height': '500px'}}>
            <Animation
              src={original[0].inProgress}
              />
          </div>
        </main> 
        )
      }
    </section>
  )
}

