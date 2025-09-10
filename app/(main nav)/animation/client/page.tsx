import { cinzel_decorative } from '@/fonts'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../sanity/lib/client'
import AnimationNav from '@/components/Nav'
import Project from '@/animation/projects'
import { Footer } from '@/components/Footer'
import { NoClients } from '@/components/NoClients'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'SG | Client Animation',
  description: 'Client Animation created by the Sleepy Gallows.',
  keywords: 'animation, sleepy gallows, brittney, chicago artist, evanston artist, black artist',
}

const POSTS_QUERY = `
*[ _type == "animatedWork"
   && Header == "Client Work"
 ] {
    "id": _id,
    "animations": animation[]{ _key, link, summary, title, year}
 }
`;
export default async function Client() {
  const project = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <>
      <main> 
        <header>
          <AnimationNav/>
          <h1 className={`${textStyles.text_center } ${cinzel_decorative.className}`}>Client Work</h1>
        </header>
        <div className={styles.videoWrapper}>
          {project[0].animations.map((project)=> (
            <Project
              key={project._key}
              title={project.title}
              year={project.year}
              summary={project.summary}
              link={project.link}
              website={project.website}
            />
          ))}
        </div>
      </main>
      <NoClients/>
      <Footer
      name={'Sleepy Gallows'}
      />
    </>
  )
}
