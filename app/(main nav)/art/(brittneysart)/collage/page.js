import { performRequest } from '@/lib/datocms'
import Grid from '@/components/Grid'
import ArtNav from '@/art/nav'
import { Footer } from '@/components/Footer'
import styles from '@/style/artGrid.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Brittney\'s Art',
  description: "Showcase the art of Brittney Galloway.",
  keywords: "brittney galloway, art, plh, collage",
}

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
        page1={'drawings'}
        page2={'collage'}
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
