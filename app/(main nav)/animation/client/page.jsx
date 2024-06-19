import { performRequest } from '@/app/lib/datocms'
import { cinzel_decorative } from '@/app/fonts'
import AnimationNav from '@/app/components/nav'
import Project from '../projects'
import { Footer } from '@/app/components/footer'
import { NoClients } from '@/app/components/noClients'
import styles from '../page.module.scss'
import textStyles from '@/app/style/titles.module.scss'

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
    isyoutube
    youtubeId
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
              key={project?.title}
              title={project?.title}
              year={project?.year}
              summary={project?.summary}
              link={project?.link}
              youtubeId={project?.youtubeId}
              website={project?.website}
              isYoutube={project?.isyoutube}
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
