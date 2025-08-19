import Image from 'next/image'
import Link from 'next/link'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../sanity/lib/client'
import { cinzel_decorative } from '@/fonts'
import { rgbDataURL } from '@/lib/utils'
import { NoClients } from '@/components/NoClients'
import styles from './page.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | About',
  description: "About the Sleepy Gallows.",
  keywords: "animation, sleepy gallows, brittney, crystal, galloway, art, for peace love harmony",
}


const POSTS_QUERY = `*[
  _type == "textPages"
    && header == "About the Sleepy Gallows"
  ] 
  {
    "header": header,
    "subHeader": body[0].children[0].text,
    "body1": body[1].children[0].text,
    "body2": body[2].children[0].text,
    "body3": body[3].children[0].text,
    "linkText": body[3].children[1].text,
    "body4": body[3].children[2].text,
  }`;


export default async function About() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  const text = posts[0];
  return (
    <>
      <main className={styles.main}>
        <article>
          <h1 className={`${cinzel_decorative.className}`}>{text.header}</h1>
          <h3>{text.subHeader}</h3>
          <p>
            {text.body1}
          </p>
          <p>
            {text.body2}
          </p>
          <p>
            {text.body3}<Link href='/animation/originals/plh'>{text.linkText}</Link>{text.body4}
          </p>
        </article>
        <article className={styles.creators}>
          <h2 className={`${cinzel_decorative.className}`}>About the Creators</h2>
          <h3>
            We are Sisters by blood in sister fields: Animation and Illustration!
          ​​​​​​​</h3>
          <Image 
          src='https://www.datocms-assets.com/53347/1731640691-brit-mio.webp' 
          alt='The Galloway Sisters: Crystal (left) and Brittney (right) as drawn in the "For Peace, Love, and Harmony" style. Art by Crystal'
          width={530} 
          height={600}
          placeholder='blur'
          blurDataURL={rgbDataURL(228, 220, 243)}
          loading='lazy'
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