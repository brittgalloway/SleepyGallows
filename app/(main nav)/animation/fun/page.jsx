import { performRequest } from '@/app/lib/datocms'
import { cinzel_decorative } from '@/app/fonts'
import AnimationNav from '@/app/components/nav'
import Project from '../projects'
import { Footer } from '@/app/components/footer'
import styles from '../page.module.scss'
import textStyles from '@/app/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Fun Animations',
  description: "Fun Animation created by Brittney Galloway.",
  keywords: "animation, sleepy gallows, brittney",
}

const PAGE_CONTENT_QUERY = `
query Fun{
  allForFuns(orderBy: year_DESC) {
    link
    title
    summary
    year
    isyoutube
    youtubeId
  }
}
`;
export default async function Fun() {
  const { data: { allForFuns } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <>
      <main> 
        <header>
          <AnimationNav/>
          <h1 className={`${textStyles.text_center } ${cinzel_decorative.className}`}>Passion Projects</h1>
        </header>
        <div className={styles.videoWrapper}>
          {allForFuns.map((project)=> (
            <Project
              key={project?.title}
              title={project?.title}
              year={project?.year}
              summary={project?.summary}
              link={project?.link}
              youtubeId={project?.youtubeId}
              isYoutube={project?.isyoutube}
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

