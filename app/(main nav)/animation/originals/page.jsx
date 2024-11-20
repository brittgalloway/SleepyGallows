import Link from 'next/link'
import Image from 'next/image'
import { cinzel_decorative } from '@/fonts'
import { performRequest } from '@/lib/datocms'
import { rgbDataURL } from '@/lib/utils'
import AnimationNav from '@/components/Nav'
import { Footer } from '@/components/Footer'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Originals',
  description: "Original Animation created by the Sleepy Gallows. Browse our short films and webseries.",
  keywords: "animation, sleepy gallows, for peace love and harmony, elusive green elephant",
}

const PAGE_CONTENT_QUERY = `
query Originals{
  allOriginals {
    name
    link
    id
    thumb {
      alt
      url
    }
  }
}
`;
export default async function Originals() {
  const { data: { allOriginals} } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <>
      <main> 
        <header>
          <AnimationNav/>
          <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>Originals</h1>
          <h2 className={`${textStyles.textCenter }`}>SG Shorts and Webseries</h2>
        </header>
        <div className={styles.projectWrapper}>
          {allOriginals.map((project)=> (
            <div key={project?.id} className={styles.project}>
              <Link href={`/animation/originals/${project?.link.toString().toLowerCase()}`}
                aria-label={`Click here for more information on ${project?.name}`}> 
                <Image
                width={400}
                height={400}
                src={project?.thumb?.url} 
                alt={`Reads as: "${project?.name}"`}
                placeholder='blur'
                blurDataURL={rgbDataURL(228, 220, 243)}
                loading='lazy'/>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer
      name={'Sleepy Gallows'}
      />
    </>
  )
}
