import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../../sanity/lib/client'
import ArtNav from '@/art/nav'
import Grid from '@/components/Grid'
import { Footer } from '@/components/Footer'
import styles from '@/style/artGrid.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Brittney\'s Art',
  description: "Showcase the art of Brittney Galloway.",
  keywords: "brittney galloway, art, elusive green elephant, ",
}

const POSTS_QUERY = `*[
  _type == "imageGallery" &&
  title == "Brittney's Drawings"
  ] 
  {
    "id": _id,
    "gallery": gallery[]{ caption, alt, hotspot{...},  asset-> { assetId, metadata, _id, url } },
    }
`;
export default async function Brittney() {
  const images = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
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
            photos={images[0].gallery}
            />
        </section>
      </main>
      <Footer
      name={'Brittney Galloway'}
      />
    </>
  )
}
