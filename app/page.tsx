import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import Image from 'next/image'
import Link from 'next/link'
import { rgbDataURL } from '@/lib/utils'
import styles from './page.module.scss'
import textStyles from '@/style/titles.module.scss'

const POSTS_QUERY = `*[
  _type == "imageGallery" &&
  title == "Home Page"
  ] 
  {
    "title": title,
    "id": _id,
    "gallery": gallery[]{alt, hotspot{...},  asset-> { url } },
    }
`;
export default async function Home() {
  const images = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  const img = images[0];
  
  const links = [
    [styles.imgAnimation, 'animation', img.gallery[0].asset.url, img.gallery[0].alt],
    [styles.imgComic, 'comics', img.gallery[2].asset.url, img.gallery[2].alt],
    [styles.imgArt, 'art', img.gallery[1].asset.url, img.gallery[1].alt],
    [styles.imgShop, 'shop', img.gallery[3].asset.url, img.gallery[3].alt],
  ]
  return (
    <main className={styles.main}>
      {links.map((link, index)=>(
        <Link key={index} href={`/${link[1]}`} className={link[0]}>
          <p className={`${textStyles.cinzelDec}`}>{link[1]}</p>
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
