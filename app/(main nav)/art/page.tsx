import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import Image from 'next/image'
import Link from 'next/link'
import { cinzel_decorative } from '@/fonts'
import { rgbDataURL } from '@/lib/utils'
import styles from './page.module.scss'
import MainNavigation from '@/components/MainNavigation'

export const metadata = {
  title: 'Sleepy Gallows Studio | Art',
  description: 'Showcase the art of Brittney and Crystal Galloway.',
  keywords: 'brittney galloway, crystal galloway, art, necahual, elusive green elephant, plh, chicago artist, evanston artist, black artist',
}
const POSTS_QUERY = `*[
  _type == "imageGallery" &&
  title == "Art Home"
  ] 
  {
    "id": _id,
    "gallery": gallery[]{alt, asset->{ url }},
    }
`;
export default async function Art() {
  const images = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  const img = images[0];
  return (
    <>
      <MainNavigation/>
      <main className={styles.main}>
          <Link className={styles.a} href="/art/illustration">
              <p className={`${styles.p} ${cinzel_decorative.className}`} >Crystal</p>
              <Image 
                className={styles.img}
                src={img.gallery[1].asset.url} 
                alt={img.gallery[1].alt}
                width={700}
                height={1000}
                placeholder='blur'
                blurDataURL={rgbDataURL(228, 220, 243)}
                loading='lazy'
                />
          </Link>
          <Link className={styles.a} href="/art/drawings">
            <p className={`${styles.p} ${cinzel_decorative.className}`}>Brittney</p>
            <Image 
              className={styles.img}
              src={img.gallery[0].asset.url} 
              alt={img.gallery[0].alt}
              width={700}
              height={1000}
              placeholder='blur'
              blurDataURL={rgbDataURL(228, 220, 243)}
              loading='lazy'
              />
          </Link>
      </main>
    </>
  )
}