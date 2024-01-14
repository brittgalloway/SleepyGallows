import { performRequest } from '@/app/lib/datocms'
import { grandstander } from '@/app/fonts'
import Link from 'next/link'
import BrittneyAvitar from '@/app/components/headerAnimation'
import WebProjects from './WebProjects'
import WebContact from './WebContact'
import WebTools from './WebTools'
import styles from './page.module.scss'

const PAGE_CONTENT_QUERY = `
query web {
  allWebProjects {
    tools
    projectName
    liveApp
    id
    github
    description
    icon {
      title
    }
    screenshot {
      url
    }
  }
}
`;
export default async function Webdev() {
  const { data: { allWebProjects } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <>
      <main className={styles.main}>
        <header>
          <div className={`${styles.headerWrapper} ${grandstander.className}`}>
            <h1>Brittney Galloway</h1>
            <h2>Frontend Web Developer</h2>
            <Link href='#connect' className={styles.graphic}>
              <BrittneyAvitar/>
            </Link>
          </div>
        </header>
        <section id='aboutMe'>
          <p>I’m a front-end web developer with a background in animation. I learned web development to build an art portfolio for my sister and myself. Then I built an e-commerce store for my sister’s art.</p>
          <p>Now I’m a professional front-end developer fixing bugs and matching mockups for an e-commerce company.</p>
          <p>Based in the Chicagoland area.</p>
        </section> 
        <h2 className={`${styles.h2} ${grandstander.className}`}>Projects</h2>
        <section className={styles.projectSection}>
          {allWebProjects.map((project)=> (
            <WebProjects
            key={project.id}
            id={project.id}
            icon={project.icon}
            projectName={project.projectName}
            screenshot={project.screenshot}
            description={project.description}
            liveApp={project.liveApp}
            github={project.github}
            />
          ))}
        </section>
        <WebTools/>
        <WebContact/>
      </main>
      <aside className={styles.oneMoreThing}>
        <h2 className={grandstander.className}>One more thing!</h2>
        <p>Art helps my coding and coding helps my art.</p>
        <p>Learning JavaScript has helped me with my 2D animations via Adobe After Effects Expressions. Similarly Python scripts have been helpful in Blender, even using Grease Pencil. Here, I also created my own Lottie files with Adobe After Effects.
  I can’t wait to make cool stuff as I learn to mix these 2 passions more and more.</p>
      </aside>
    </>
  )
}