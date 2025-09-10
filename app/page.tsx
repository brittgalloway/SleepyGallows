import { type SanityDocument } from 'next-sanity'
import { client } from '../sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import { cinzel_decorative } from '@/fonts'
import { rgbDataURL } from '@/lib/utils'
import styles from './page.module.scss'

const POSTS_QUERY = `*[
  _type == "imageGallery" &&
  title == "Home Page"
  ] 
  {
    "title": title,
    "id": _id,
    "gallery": gallery[].asset->{ title, assetId, altText, metadata, _id, url},
    }
`;
export default async function Home() {
  const images = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  const img = images[0];
  
  const links = [
    [styles.imgAnimation, 'animation', img.gallery[0].url, img.gallery[0].altText],
    [styles.imgComic, 'comics', img.gallery[2].url, img.gallery[0].altText],
    [styles.imgArt, 'art', img.gallery[1].url, img.gallery[0].altText],
    [styles.imgShop, 'support', img.gallery[3].url, img.gallery[0].altText],
  ]
  return (
    <main className={styles.main}>
      {links.map((link, index)=>(
        <Link key={index} href={`/${link[1]}`} className={link[0]}>
          <p className={`${cinzel_decorative.className}`}>{link[1]}</p>
          <Image 
            src={link[2]}
            alt={link[3]}
            width={500}
            height={250}
            placeholder='blur'
            blurDataURL={rgbDataURL(147, 112, 219)}
            loading='lazy'
            />
        </Link>
      ))}

    </main>
  )
}
