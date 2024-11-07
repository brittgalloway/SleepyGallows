import Image from 'next/image'
import { cinzel_decorative } from '@/fonts'
import { performRequest } from '@/lib/datocms'
import { rgbDataURL } from '@/lib/utils'
import OriginalsNav from '@/components/OriginalsNav'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

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
    <section>
      <header>
        <OriginalsNav 
          navLabel={original.link}/>
        <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>What is {original.name}?</h1>
      </header>
      <p dangerouslySetInnerHTML={{ __html: original.summary }}/>
      <h2 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>
        Characters
      </h2>
      <div className={styles.videoWrapper}>
        {original.about.map(({character})=> (
            <div key={character.id}>
              <Image 
                width={300}
                height={250}
                src={character.url} alt={character.alt}
                placeholder='blur'
                blurDataURL={rgbDataURL(74, 40, 124)}
                loading='lazy'/>
          </div>
      ))}
      </div>
    </section>
  )
}

