import { cinzel_decorative } from '@/app/fonts'
import Image from 'next/image'
import OriginalsNav from '@/app/components/OriginalsNav';
import { performRequest } from '@/app/lib/datocms'
import styles from '../../../../page.module.scss'
import textStyles from '@/app/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | About EGE',
  description: "The Elusive Green Elephant is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.",
  keywords: "animation, sleepy gallows, elusive green elephant",
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
                  height={300}
                  src={character.url} alt={character.alt}/>
              </div>
          ))}
        </div>
    </section>
  )
}

