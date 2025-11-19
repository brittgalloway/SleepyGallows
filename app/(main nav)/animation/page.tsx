import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import Image from 'next/image'
import Link from 'next/link'
import { rgbDataURL } from '@/lib/utils'
import styles from './page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Animation',
  description: "Animation of the Sleepy Gallows.",
  keywords: "animation, sleepy gallows, brittney",
}
const POSTS_QUERY = `*[
  _type == "imageGallery" &&
  title == "Animation Home"
  ] 
  {
    "id": _id,
    "gallery": gallery[]{alt, asset->{ url }},
    }
`;
export default async function Animation() {
  const images = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  const img = images[0];
  const links = [
    ['Originals', styles.original, styles.imgOriginal, 'originals', img.gallery[0].asset.url, img.gallery[0].asset.alt],
    ['Client Work', styles.client, styles.img, 'client', img.gallery[1].asset.url, img.gallery[1].asset.alt],
    ['For Fun', styles.fun, styles.img, 'fun', img.gallery[2].asset.url, img.gallery[2].asset.alt],
  ];
  return (
    <main className={styles.main}> 
    {links.map((link, index)=> (
      <Link key={index} className={link[1]} href={`/animation/${link[3]}`}>
        <p className={`${styles.p} ${textStyles.cinzelDec}`}>{link[0]}</p>
        <Image 
        className={link[2]}
        src={link[4]} 
        alt={link[5]}
        width={900}
        height={300}
        placeholder='blur'
        blurDataURL={rgbDataURL(228, 220, 243)}
        loading='lazy'
        />
      </Link>
    ))}
    </main>
  )
}
