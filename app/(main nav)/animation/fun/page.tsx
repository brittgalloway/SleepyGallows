import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import AnimationNav from '@/components/Nav'
import Project from '@/animation/projects'
import { Footer } from '@/components/Footer'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'SG | Fun Animations',
  description: 'Fun Animation created by Brittney Galloway.',
  keywords: 'animation, sleepy gallows, brittney, chicago artist, evanston artist, black artist',
}

const POSTS_QUERY = `
*[ _type == "animatedWork"
   && Header == "Passion Projects"
 ] {
    "id": _id,
    "animations": animation[]{ _key, link, summary, title, year}
 }
`;
export default async function Fun() {
  const project = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <>
      <main> 
        <header>
          <AnimationNav/>
          <h1 className={`${textStyles.text_center } ${textStyles.cinzelDec}`}>Passion Projects</h1>
        </header>
        <div className={styles.videoWrapper}>
          {project[0].animations.map((animation: {
            _key: string
            link: string
            summary: string
            title: string
            year: string
          }) => (
            <Project
              key={animation?._key}
              title={animation?.title}
              year={animation?.year}
              summary={animation?.summary}
              link={animation?.link}
            />
          ))}
        </div>
      </main>
      <Footer
      name={'Sleepy Gallows'}
      />
    </>
  )
}