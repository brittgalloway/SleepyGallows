import { cinzel_decorative } from '@/fonts'
import { performRequest } from '@/lib/datocms'
import OriginalsNav from '@/components/OriginalsNav'
import Iframe from '@/components/Iframe'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | For Peace, Love, & Harmony',
  description: 'For Peace, Love, & Harmony is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.',
  keywords: 'animation, sleepy gallows, for peace love and harmony, chicago artist, evanston artist, black artist',
}

const PAGE_CONTENT_QUERY = `
query Watch{
  original(filter: {name: {eq: "For Peace, Love, & Harmony"}}) {
    name
    link
    watch {
      year
      updatedAt
      title
      link
      id
    }
  }
}
`;
export default async function PlhWatch() {
  const { data: { original } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <section>
      <header>
        <OriginalsNav 
          navLabel={original?.link}/>
       <h1 className={`${textStyles.text_center } ${cinzel_decorative.className}`}>{original.name}</h1>
      </header>
      <div className={styles.videoWrapper}>
        {original.watch.map((video)=> (
          <div key={video?.id} className={styles.video}>
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
    </section>
  )
}

