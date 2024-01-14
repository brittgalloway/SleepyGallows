import { cinzel_decorative } from '@/app/fonts'
import Grid from '@/app/components/grid'
import OriginalsNav from '@/app/components/originalsNav'
import { performRequest } from '@/app/lib/datocms'
import styles from '@/app/style/artGrid.module.scss'
import textStyles from '@/app/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Art of PLH',
  description: "For Peace, Love, & Harmony is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.",
  keywords: "animation, sleepy gallows, for peace love and harmony",
  author:"Brittney Galloway",
}

const PAGE_CONTENT_QUERY = `
query Watch{
  original(filter: {name: {eq: "For Peace, Love, & Harmony"}}) {
    name
    link
    summary
    art {
      image2 {
        alt
        id
        height
        url
        title
        width
      }
    }
  }
}
`;
export default async function PlhWatch() {
  const { data: { original } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <section className={styles.gridImg}>
      <header>
        <OriginalsNav 
          navLabel={original.link}/>
        <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>Art of {original.name}</h1>
      </header>
      <div>
        <Grid
          photos={original.art}
          name={'image2'}
          />
      </div>
    </section>
  )
}

