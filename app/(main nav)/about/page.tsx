import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import { NoClients } from '@/components/NoClients'
import styles from './page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | About',
  description: 'About the Sleepy Gallows.',
  keywords: 'animation, sleepy gallows, brittney, crystal, galloway, art, for peace love harmony,chicago artist, evanston artist, black artist',
}


const POSTS_QUERY = `*[
  _type == "textPages"
    && header == "About the Sleepy Gallows"
  ] 
  {
    "header": header,
    "bodyText": body,
  }`;
const IMAGE_QUERY = `*[
  _type == "imageGallery" &&
  title == "Home Page"
  ] 
  {
    "title": title,
    "id": _id,
    "gallery": gallery[4]{alt, asset->{ url}},
    }
`;

export default async function About() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  const img = await client.fetch<SanityDocument[]>(IMAGE_QUERY, {});
  const text = posts[0];
  return (
    <>
      <main className={styles.main}>
        <article className={`${textStyles.lato}`}>
          <h1>{text.header}</h1>
          <PortableText
            value={text.bodyText}
            // components={/* optional object of custom components to use */}
          />
        </article>
        <article className={styles.creators}>
          <h2>About the Creators</h2>
          <h3 className={`${textStyles.weightNormal}`}>
            We are Sisters by blood in sister fields: Animation and Illustration!
          ​​​​</h3>
          <Image 
          src={img[0].gallery.asset.url}
          alt={img[0].alt}
          width={530} 
          height={600}
          />
          <p>
            We were born and raised in the Chicagoland area and went to California College of the Arts (CCA) in the Bay Area. Brittney (right) got her BFA in Animation (2014) while Crystal (left) got her BFA in Illustration(2015). Now both sisters are back in Chicago making art.
          </p>
        </article>
      </main>
      <NoClients/>
    </>
  )
}