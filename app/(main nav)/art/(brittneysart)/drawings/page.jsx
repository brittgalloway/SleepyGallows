import { performRequest } from '@/lib/datocms'
import ArtNav from '@/art/nav'
import Grid from '@/components/Grid'
import { Footer } from '@/components/Footer'
import styles from '@/style/artGrid.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Brittney\'s Art',
  description: 'Showcase the art of Brittney Galloway.',
  keywords: 'brittney galloway, art, plh, chicago artist, evanston artist, black artist',
}

const PAGE_CONTENT_QUERY = `
query Sketches{
  allSketchImgs {
    id
    sketchImg {
      url
      title
      alt
      height
      width
    }
  }
}
`;
export default async function Brittney() {
  const { data: { allSketchImgs } } = await performRequest({ query: PAGE_CONTENT_QUERY });
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
          photos={allSketchImgs}
          name={'sketchImg'}
          />
        </section>
      </main>
      <Footer
      name={'Brittney Galloway'}
      />
    </>
  )
}
