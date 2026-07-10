import { cinzel_decorative } from '@/fonts'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../sanity/lib/client'
import AnimationNav from '@/components/Nav'
import Project from '../projects'
import { Footer } from '@/components/Footer'
import styles from '../page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'SG | Fun Animations',
  description: "Fun Animation created by Brittney Galloway.",
  keywords: "animation, sleepy gallows, brittney galloway",
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
          <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>Passion Projects</h1>
        </header>
        <div className={styles.videoWrapper}>
          {project[0].animations.map((project)=> (
            <Project
              key={project?._key}
              title={project?.title}
              year={project?.year}
              summary={project?.summary}
              link={project?.link}
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

