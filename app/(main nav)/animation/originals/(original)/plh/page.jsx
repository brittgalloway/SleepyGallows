import { YouTubeEmbed } from '@next/third-parties/google'
import { performRequest } from '@/app/lib/datocms'
import { cinzel_decorative } from '@/app/fonts'
import OriginalsNav from '@/app/components/originalsNav'
import styles from '../../../page.module.scss'
import textStyles from '@/app/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | For Peace, Love, & Harmony',
  description: "For Peace, Love, & Harmony is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.",
  keywords: "animation, sleepy gallows, for peace love and harmony",
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
      id
      isyoutube
      youtubeId
    }
  }
}
`;
export default async function PlhWatch() {
  const { data: { original } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <main>
      <header>
        <OriginalsNav 
          navLabel={original?.link}/>
       <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>{original?.name}</h1>
      </header>
      <div className={styles.videoWrapper}>
        {original?.watch.map((video)=> (
          <div key={video?.id} className={styles.video}>
            <YouTubeEmbed videoid={video?.youtubeId} width={376} height={212} />
              <h2 className={textStyles.title}>
                {video?.title}
              </h2> 
              <p className={textStyles.title}>{video?.year}</p>        
          </div>
        ))}
      </div>
    </main>
  )
}

