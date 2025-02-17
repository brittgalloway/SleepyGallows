import { cinzel_decorative } from '@/fonts'
import { performRequest } from '@/lib/datocms'
import AnimationNav from '@/components/Nav'
import Project from '@/animation/projects'
import { Footer } from '@/components/Footer'
import { NoClients } from '@/components/NoClients'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Client Animation',
  description: "Client Animation created by the Sleepy Gallows.",
  keywords: "animation, sleepy gallows, brittney",
}

const PAGE_CONTENT_QUERY = `
query Client{
  allClientWorks(orderBy: year_DESC) {
    year
    website
    title
    summary
    link
  }
}
`;
export default async function Client() {
  const { data: { allClientWorks } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <>
      <main> 
        <header>
          <AnimationNav/>
          <h1 className={`${textStyles.text_center } ${cinzel_decorative.className}`}>Client Work</h1>
        </header>
        <div className={styles.videoWrapper}>
          {allClientWorks.map((project)=> (
            <Project
              key={project.title}
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
