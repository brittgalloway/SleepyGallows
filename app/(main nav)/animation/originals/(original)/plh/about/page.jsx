import { performRequest } from '@/app/lib/datocms'
import { cinzel_decorative } from '@/app/fonts'
import Image from 'next/image'
import OriginalsNav from '@/app/components/originalsNav'
import styles from '../../../../page.module.scss'
import textStyles from '@/app/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | About PLH',
  description: "For Peace, Love, & Harmony is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.",
  keywords: "animation, sleepy gallows, for peace love and harmony",
}

const PAGE_CONTENT_QUERY = `
query Watch{
  original(filter: {name: {eq: "For Peace, Love, & Harmony"}}) {
    about {
      character {
        url
        title
        alt
        id
      }
    }
    name
    link
    summary
  }
}
`;
export default async function PlhAbout() {
  const { data: { original } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <main>
      <header>
        <OriginalsNav 
          navLabel={original?.link}/>
        <h1 className={`${textStyles.text_center } ${cinzel_decorative.className}`}>What is {original?.name}?</h1>
      </header>
      <p dangerouslySetInnerHTML={{ __html: original?.summary }}/>
      <h2 className={`${textStyles.text_center } ${cinzel_decorative.className}`}>
        Characters
      </h2>
      <div className={styles.videoWrapper}>
        {original.about.map(({character})=> (
            <div key={character?.id}>
              <Image 
                width={300}
                height={250}
                src={character?.url} alt={character?.alt}/>
          </div>
      ))}
      </div>
    </main>
  )
}

