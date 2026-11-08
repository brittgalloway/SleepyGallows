import { PortableText } from '@portabletext/react'
import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import { NoClients } from '@/components/NoClients'
import { Footer } from '@/components/Footer'
import styles from '../page.module.scss'
import textStyles from '@/style/titles.module.scss'

const POSTS_QUERY = `*[
  _type == "textPages"
    && header == "Accessibility"
  ] 
  {
    "header": header,
    "bodyText": body,
  }`;


export default async function Accessibility() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
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
      </main>
      <NoClients/>
      <Footer
      name={'Sleepy Gallows Studio'}
      />
    </>
  )
}