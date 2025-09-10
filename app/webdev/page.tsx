import Link from 'next/link'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../sanity/lib/client'
import { grandstander } from '@/fonts'
import BrittneyAvitar from '@/components/HeaderAnimation'
import WebProjects from '@/components/WebProjects'
import WebContact from '@/components/WebContact'
import WebTools from '@/components/WebTools'
import styles from './page.module.scss'

const PROJECT_QUERY = `*[
     _type == "webProject"
     ] 
     { _id, _type, description, github, liveApp, role, title, tools}
`;

export default async function Webdev() {
     const webProjects = await client.fetch<SanityDocument[]>(PROJECT_QUERY, {});
 return (
  <>
   <main className={styles.main}>
    <header>
     <div className={`${styles.headerWrapper} ${grandstander.className}`}>
          <h1>Brittney Galloway</h1>
          <h2>Frontend Web Developer</h2>
          <Link href='#connect' className={styles.graphic}>
               <BrittneyAvitar />
          </Link>
     </div>
    </header>
    <section id='aboutMe'>
     <p>I&apos;m a frontend developer based in Chicagoland with a background in animation. My journey into web development started when I built a <Link href="/">portfolio site</Link> for my animated projects. That one project turned into a passion for crafting intuitive, accessible, and well-structured web experiences.</p>
     <p>In 2021, I built an ecommerce platform, <a href="https://candyfluffs.com">Candy Fluffs</a>, for my sister&apos;s artwork, focusing on performance, scalability, and maintainable code. Now, I work at an ecommerce company improving code quality, user experience, and site performance—from refining accessibility to optimizing page load times.</p>
     <h2 className={`${styles.h2} ${grandstander.className}`}>Experience</h2>
     <p className={`${styles.experience}`}><strong>Cleverbridge</strong> 2021-present</p>
     <ul className={styles.achievements}>
          <li className={styles.askAboutThis}>
               Developed responsive, accessible interfaces for major enterprise clients, focusing on performance and usability.
          </li>
          <li className={styles.askAboutThis}>
               Built a Node.js script to migrate Gulp builds to Webpack, standardizing our codebase and improving developer efficiency.
          </li>
          <li>
               Led a major code refactor for a Wait Don&apos;t Leave pop-up--removing XSS vulnerabilities, enhancing legal compliance, and improving platform stability.
          </li>
          <li>
               Reviewed and refactored code to reduce technical debt and ensure long-term maintainability.
          </li>
     </ul>
    </section> 
    <h2 className={`${styles.h2} ${grandstander.className}`}>Projects</h2>
    <section className={styles.projectSection}>
     {webProjects.map((project)=> (
        <WebProjects
          key={project?._id}
          id={project?._id}
          projectName={project?.title}
          role={project?.role}
          description={project?.description}
          liveApp={project?.liveApp}
          github={project?.github}
        />
      ))}
    </section>
    <h2 className={`${styles.h2} ${grandstander.className}`}>Education</h2>
    <ul>
     <li>
      <p className={`${styles.experience}`}>
       <strong>Fullstack Web Development Bootcamp</strong> | 2020
      </p>
      <small>
          Northwestern University | Evanston, IL
      </small>
      <p>
          A 24-week intensive program covering HTML, CSS, JavaScript, React, Node.js, and database management.
      </p>
     </li>
     <li>
     <p className={`${styles.experience}`}>
       <strong>BFA in Animation</strong> | 2014
      </p>
      <small>
          California College of the Arts | Oakland, CA
      </small>
     </li>
    </ul>
    <WebTools/>
    <WebContact/>
   </main>
   <aside className={styles.oneMoreThing}>
    <h2 className={grandstander.className}>Art & Code—The Best of Both Worlds</h2>
    <p>Art helps my coding, and coding helps my art.</p>
    <p>Learning JavaScript has enhanced my 2D animations in Adobe After Effects through Expressions, while Python scripting in Blender has expanded what I can create. I&apos;ve also developed custom Lottie animations using After Effects to bring web interfaces to life. Every day, I find new ways to blend these two passions, and I can&apos;t wait to explore more.</p>
   </aside>
  </>
 )
}