import Image from 'next/image'
import { cinzel_decorative } from '@/fonts'
import OriginalsNav from '@/components/OriginalsNav'
import { performRequest } from '@/lib/datocms'
import { rgbDataURL } from '@/lib/utils'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | About EGE',
  description: 'The Elusive Green Elephant is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.',
  keywords: 'animation, sleepy gallows, elusive green elephant, chicago artist, evanston artist, black artist',
}

const PAGE_CONTENT_QUERY = `
query Watch{
  original(filter: {name: {eq: "The Elusive Green Elephant"}}) {
    about {
      character {
        url
        title
        alt
        id
      }
    }
    name
    summary
    link
  }
}
`;
export default async function EgeAbout() {
  const { data: { original } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <section>
      <header>
        <OriginalsNav 
          navLabel={original.link}/>
        <h1 className={`${textStyles.text_center } ${cinzel_decorative.className}`}>What is {original.name}?</h1>
      </header>
        <p dangerouslySetInnerHTML={{ __html: original.summary }}/>
        <h2 className={`${textStyles.text_center } ${cinzel_decorative.className}`}>
          Characters
        </h2>
        <div className={styles.videoWrapper}>
          {original.about.map(({character})=> (
              <div key={character.id}>
                <Image 
                  width={300}
                  height={300}
                  src={character.url} alt={character.alt}
                  placeholder='blur'
                  blurDataURL={rgbDataURL(228, 220, 243)}
                  loading='lazy'/>
              </div>
          ))}
        </div>
        Concept Art
    </section>
  )
}

