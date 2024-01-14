import { performRequest } from '@/app/lib/datocms'
import Grid from '@/app/components/grid'
import ArtNav from '../../nav'
import { Footer } from '@/app/components/footer'
import styles from '@/app/style/artGrid.module.scss'

const PAGE_CONTENT_QUERY = `
query Collage{
  allPaperCutouts {
    id
    paperArt {
      alt
      url
      title
      height
      width
    }
  }
}
`;
export default async function Collage() {
  const { data: { allPaperCutouts } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <>
      <main className={styles.gridImg}> 
        <ArtNav
        navLabel={'Brittney\'s Art Page Navigation'}
        page1={'Drawings'}
        page2={'Collage'}
        />
        <section>
          <Grid
          photos={allPaperCutouts}
          name={'paperArt'}
          />
        </section>
      </main>
      <Footer
      name={'Brittney Galloway'}
     />
    </>
  )
}
