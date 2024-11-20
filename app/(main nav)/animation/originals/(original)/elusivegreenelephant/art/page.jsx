import { cinzel_decorative } from '@/fonts'
import Grid from '@/components/Grid'
import OriginalsNav from '@/components/OriginalsNav'
import { performRequest } from '@/lib/datocms'
import styles from '@/style/artGrid.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Art of EGE',
  description: "The Elusive Green Elephant is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.",
  keywords: "animation, sleepy gallows, elusive green elephant",
}

const PAGE_CONTENT_QUERY = `
query Watch{
  original(filter: {name: {eq: "The Elusive Green Elephant"}}) {
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
export default async function EgeWatch() {
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

