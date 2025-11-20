import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import OriginalsNav from '@/components/OriginalsNav'
import  Iframe  from '@/components/Iframe'
import Animation from '@/components/rive'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'


export default async function watchOriginal({params}) {
  const { original } = await params;

  const POSTS_QUERY = await `*[
    _type == "original"
    && link.current == "${original}"
  ] 
  {
    "title": title,
    "id": _id,
    "link": link.current,
    "hasVideo": production.hasLiveVideo,
    "inProgress": production.inProduction.asset->url,
    "watch": production.watch->{ _id, animation[]{link, title,year} },
  }`;
  const originalObj = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  const orig = originalObj[0];
  return (
    <section style={{display: 'flex', flexDirection: 'column'}}>
      <header>
        <OriginalsNav 
          navLabel={orig?.link}/>
        <h1 className={`${textStyles.text_center} ${textStyles.cinzelDec}`}>{orig.title}</h1>
      </header>
      { orig?.hasVideo == true ? (
        <main>
           <div className={styles.videoWrapper}>
              {orig.watch.animation.map((video)=> (
                <div key={video?._id} className={styles.video}>
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
          <div style={{'height': '500px'}}>
            <Animation
              src={orig.inProgress}
              />
          </div>
        </main> 
        )
      }
    </section>
  )
}

