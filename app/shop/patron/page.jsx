import { performRequest } from '@/lib/datocms'
import { lato } from '@/fonts'
import styles from '@/shop/page.module.scss'
import {PatronButton} from './PatronBtn'


export const metadata = {
  title: 'Sleepy Gallows Studio | Patron Support',
  description: "The Sleepy Gallows e-commerce store. Please consider becoming a patron.",
  keywords: "shop, art, art prints, sleepy gallows",
}
const PAGE_CONTENT_QUERY = `
query Patron{
  patron {
    id
    header
    patronText
  }
}
`;

export default async function Patron() {
  const { data: { patron } } = await performRequest({ query: PAGE_CONTENT_QUERY });

  return (
    <main className={styles.main}>
      <h1 className={styles.patron_h1}>{patron?.header}</h1>
      <div className={`${lato.className}`} dangerouslySetInnerHTML={{__html: patron?.patronText}} />
      <PatronButton/>
      <p>Or, if you&apos;d prefer, you can buy me a <a href="https://ko-fi.com/sleepygallows">Kofi</a></p>
    </main>
  )
}


