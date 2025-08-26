import { cinzel_decorative } from '@/fonts'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../../sanity/lib/client'
import Grid from '@/components/Grid'
import ArtNav from '@/art/nav'
import { Footer } from '@/components/Footer'
import styles from '@/art/page.module.scss'

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
      "mermaidGallery": mermaidGallery-> {  gallery[]{ asset-> { assetId, altText, metadata, _id, url } } },
      "visDevGallery": visDevGallery-> {  gallery[]{ asset-> { assetId, altText, metadata, _id, url } } },
  }
`;
export default async function Visdev() {
  const images = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <>
      <main className={styles.gridImg}> 
        <ArtNav
        navLabel={'Crystal\'s Art Page Navigation'}
        page1={'illustration'}
        page2={'visdev'}
        />
        <article className={styles.article}>
          <header>
            <h1 className={`${cinzel_decorative.className} ${styles.h1}`}>{images[0].mermaidTitle}</h1>
            {images[0].mermaidDescription.map((description) => <p>{description.children[0].text}</p>)}
          </header>
          <h2 className={`${cinzel_decorative.className} ${styles.h1}`}>Characters</h2>
          <Grid
          photos={images[0].mermaidGallery.gallery}
          name={'asset'}
          />
        </article>
        <article className={styles.article}>
          <h2 className={`${cinzel_decorative.className} ${styles.h1}`}>{images[0].visualDevelopment}</h2>
          <Grid
          photos={images[0].visDevGallery.gallery}
          name={'asset'}
          />
        </article>
      </main>
      <Footer
      name={'Crystal Galloway'}
      />
    </>
  )
}
