import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../../sanity/lib/client'
import Grid from '@/components/Grid'
import ArtNav from '@/art/nav'
import { Footer } from '@/components/Footer'
import styles from '@/style/artGrid.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Brittney\'s Art',
  description: "Showcase the art of Brittney Galloway.",
  keywords: "brittney galloway, art, plh, collage",
}

const POSTS_QUERY = `*[
  _type == "imageGallery" &&
  title == "Brittney's Collage"
  ] 
  {
    "id": _id,
    "gallery": gallery[]{ caption, alt, hotspot{...},  asset-> { assetId, metadata, _id, url } },
    }
`;
export default async function Collage() {
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
