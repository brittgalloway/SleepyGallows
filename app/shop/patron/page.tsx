import { KOFI } from '@/lib/data'
import {PortableText} from '@portabletext/react'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../sanity/lib/client'
import styles from '@/shop/page.module.scss'
import patronStyles from '@/shop/patron/patron.module.scss'
import { StripePatron } from './PatronBtn'


export const metadata = {
  title: 'Sleepy Gallows Studio | Patron Support',
  description: 'The Sleepy Gallows e-commerce store. Please consider becoming a patron and get 15% off all orders.',
  keywords: 'shop, art, art prints, sleepy gallows, chicago artist, evanston artist, black artist',
}
const POSTS_QUERY = `*[
  header == "Support the Sleepy Gallows"
]{
  "header": header,
  "text": body
}`;

export default async function Patron() {
  const patron = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});

  return (
    <main className={styles.main}>
      <h1 className={patronStyles.patron_h1}>{patron[0]?.header}</h1>
      <div>
        <PortableText
          value={patron[0].text}
          // components={/* optional object of custom components to use */}
        />
      </div>
      <StripePatron/>
      <p >Or, if you&apos;d prefer, you can buy me a <a href={KOFI}>Ko-fi</a></p>
    </main>
  )
}


