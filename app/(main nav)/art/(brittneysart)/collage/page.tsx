import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import { JsonLd, galleryJsonLd, BRITTNEY } from '@/lib/jsonLd'
import Grid from '@/components/Grid'
import ArtNav from '@/art/nav'
import { Footer } from '@/components/Footer'
import styles from '@/style/artGrid.module.scss'

export const metadata = {
  title: 'Brittney\'s Art | Sleepy Gallows Studio | Chicago Artist',
  description: 'Showcase the collage art of Brittney Galloway.',
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
        <JsonLd data={galleryJsonLd("Brittney Galloway's Collage Art", '/art/collage', BRITTNEY, images[0]?.gallery)} />
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
