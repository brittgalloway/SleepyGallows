import { cinzel_decorative } from '@/app/fonts'
import { performRequest } from '@/app/lib/datocms'
import OriginalsNav from '@/app/components/originalsNav'
import styles from '../../../page.module.scss'
import textStyles from '@/app/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | For Peace, Love, & Harmony',
  description: "For Peace, Love, & Harmony is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.",
  keywords: "animation, sleepy gallows, for peace love and harmony",
  author:"Brittney Galloway",
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
          navLabel={original.link}/>
       <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>{original.name}</h1>
      </header>
      <div className={styles.videoWrapper}>
        {original.watch.map((video)=> (
          <div key={video.id} className={styles.video}>
            <iframe maxwidth={376} maxheight={212} src={video.link} title={`Watch ${video.title}`} frameBorder="0" allowFullScreen></iframe>
              <h2 className={textStyles.title}>
                {video.title}
              </h2> 
              <p className={textStyles.title}>{video.year}</p>        
          </div>
        ))}
      </div>
    </section>
  )
}

