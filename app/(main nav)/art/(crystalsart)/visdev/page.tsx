import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import Grid from '@/components/Grid'
import ArtNav from '@/art/nav'
import { Footer } from '@/components/Footer'
import styles from '@/art/page.module.scss'
import imgGrid from '@/style/artGrid.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Crystal\'s Art',
  description: "Showcase the art of Crystal Galloway.",
  keywords: "crystal galloway, art, necahual, plh, the little mermaid",
}

const POSTS_QUERY = `*[
    _type == "crystalArt"
  ] 
  {
      "id": _id,
      "visualDevelopment": visualDevelopment,
      "mermaidTitle":mermaidTitle,
      "mermaidDescription":MermaidDescription[]{children[]{text}},
      "mermaidGallery": mermaidGallery-> { gallery[]{ caption, alt, hotspot{...},  asset-> { assetId, metadata, _id, url } } },
      "visDevGallery": visDevGallery-> { gallery[]{ caption, alt, hotspot{...},  asset-> { assetId, metadata, _id, url } } },
  }
`;
export default async function Visdev() {
  const images = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <>
      <main className={`${styles.gridImg}`}> 
        <ArtNav
        navLabel={'Crystal\'s Art Page Navigation'}
        page1={'illustration'}
        page2={'visdev'}
        />
        <article className={`${styles.article} ${imgGrid.gridImg}`}>
          <header>
            <h1 className={`${styles.h1}`}>{images[0].mermaidTitle}</h1>
            {images[0].mermaidDescription.map((description, idx) => <p key={idx}>{description.children[0].text}</p>)}
          </header>
          <h2 className={`${styles.h1}`}>Characters</h2>
          <Grid
          photos={images[0].mermaidGallery.gallery}
          />
        </article>
        <article className={`${styles.article} ${imgGrid.gridImg}`}>
          <h2 className={`${styles.h1}`}>{images[0].visualDevelopment}</h2>
          <Grid
          photos={images[0].visDevGallery.gallery}
          />
        </article>
      </main>
      <Footer
      name={'Crystal Galloway'}
      />
    </>
  )
}
