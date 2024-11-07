import { cinzel_decorative } from '@/app/fonts'
import { performRequest } from '@/app/lib/datocms'
import Link from 'next/link'
import Image from 'next/image'
import AnimationNav from '@/app/components/Nav'
import { Footer } from '@/app/components/Footer'
import styles from '../page.module.scss'
import textStyles from '@/app/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Originals',
  description: "Original Animation created by the Sleepy Gallows. Browse our short films and webseries.",
  keywords: "animation, sleepy gallows, for peace love and harmony, elusive green elephant",
}

const PAGE_CONTENT_QUERY = `
query Originals{
  allOriginals {
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
            <div key={project.id} className={styles.project}>
              <Link href={`/animation/originals/${project.link.toString().toLowerCase()}`}> 
                <Image
                width={250}
                height={250}
                src={project.thumb.url} 
                alt={project.thumb.alt}/>
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
