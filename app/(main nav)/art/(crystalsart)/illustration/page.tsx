import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import Grid from '@/components/Grid'
import ArtNav from '@/art/nav'
import { Footer } from '@/components/Footer'
import styles from '@/style/artGrid.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Crystal\'s Art',
  description: 'Showcase the art of Crystal Galloway.',
  keywords: 'crystal galloway, art, necahual, plh, the little mermaid, illustration, chicago artist, evanston artist, black artist',
}

const POSTS_QUERY = `*[
    _type == "crystalArt"
  ] 
  {
      "id": _id,
      "illustrationGallery": illustrationGallery-> { gallery[]{ caption, alt, hotspot{...},  asset-> { assetId, metadata, _id, url } } },
  }
`;
export default async function Crystal() {
  const images = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <>
      <main className={styles.gridImg}> 
          <ArtNav
          navLabel={'Crystal\'s Art Page Navigation'}
          page1={'illustration'}
          page2={'visdev'}
          />
          <Grid
            photos={images[0].illustrationGallery.gallery}
            />
      </main>
      <Footer
      name={'Crystal Galloway'}
      />
    </>
  )
}
