import { performRequest } from '@/app/lib/datocms'
import Grid from '@/app/components/Grid'
import ArtNav from '../../nav'
import { Footer } from '@/app/components/Footer'
import styles from '@/app/style/artGrid.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Crystal\'s Art',
  description: "Showcase the art of Crystal Galloway.",
  keywords: "crystal galloway, art, necahual, plh, the little mermaid, illustration",
}

const PAGE_CONTENT_QUERY = `
query Illustration {
  allIllustraions {
    id
    art {
      title
      url
      width
      height
      alt
    }
  }
}
`;
export default async function Crystal() {
  const { data: { allIllustraions } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <>
      <main className={styles.gridImg}> 
          <ArtNav
          navLabel={'Crystal\'s Art Page Navigation'}
          page1={'illustration'}
          page2={'visdev'}
          />
          <Grid
          photos={allIllustraions}
          name={'art'}
          />
      </main>
      <Footer
      name={'Crystal Galloway'}
      />
    </>
  )
}
