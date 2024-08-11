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
     <p>I&apos;m a frontend developer with a background in animation based in the Chicagoland area. I learned web development to build an art portfolio and a home for my animated projects.</p>
     <p>Then, in 2021, I built an ecommerce platform for my sister&apos;s art, <a href="https://candyfluffs.com">Candy Fluffs</a>.</p>
     <p>Now, I work at an ecommerce company cleaning up codebases, user experience, and performance projects.</p>
     <h2 className={`${styles.h2} ${grandstander.className}`}>Experience</h2>
     <p className={`${styles.experience}`}><strong>Cleverbridge</strong> 2021-present</p>
     <ul className={styles.achievements}>
          <li className={styles.askAboutThis}>
               Collaborated with two teammates to standardize our codebase by creating a Node.js script that converts Gulp builds to Webpack.
          </li>
          <li className={styles.askAboutThis}>
               Performed major code refactor for a standard Wait Don&apos;t Leave popup. Removed XSS vulnerabilities through URL parameters, improved legal compliance, user experience, and stability with the Cleverbridge platform.
          </li>
          <li>
               Designed and implemented flexible layouts and interactive elements for major management companies using modern CSS techniques. 
          </li>
          <li>
               Performed code reviews for code quality assurance, reducing technical debt.
          </li>
     </ul>
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
          A 24-week intensive program focused on gaining technical programming skills in HTML5, CSS3, JavaScript, jQuery, Bootstrap, Firebase, Node.js, MySQL, MongoDB, Express, Handlebars.js, and React.js.
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
    <h2 className={grandstander.className}>One more thing!</h2>
    <p>Art helps my coding and coding helps my art.</p>
    <p>Learning JavaScript has helped me with 2D animations via Adobe After Effects Expressions. Similarly, Python scripts have been helpful in Blender, even when using Grease Pencil. Here, I also created my own Lottie files with Adobe After Effects.
    I can&apos;t wait to make cool stuff as I learn to mix these two passions more and more.</p>
   </aside>
  </>
 )
}