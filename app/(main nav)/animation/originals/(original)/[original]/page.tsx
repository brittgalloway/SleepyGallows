import Image from 'next/image'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../../../sanity/lib/client'
import { cinzel_decorative } from '@/fonts'
import OriginalsNav from '@/components/OriginalsNav'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | The Elusive Green Elephant',
  description: "The Elusive Green Elephant is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.",
  keywords: "animation, sleepy gallows, elusive green elephant",
}


export default async function watchOriginal({params}) {
  const POSTS_QUERY = `*[
    _type == "original"
    && link.current == "${params.original}"
  ] 
  {
    "title": title,
    "id": _id,
    "link": link.current,
    "hasVideo": production.hasLiveVideo,
    "watch": production.watch,
  }`;
    const original = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <section style={{display: 'flex', flexDirection: 'column'}}>
      <header>
        <OriginalsNav 
          navLabel={original[0]?.link}/>
        <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>{original[0].title}</h1>
      </header>
      { original[0]?.hasVideo == true ? (
        <main>
          <h2> watch, not connected</h2>
           {/* <div className={styles.videoWrapper}>
                   {original.watch.map((video)=> (
                     <div key={video?.id} className={styles.video}>
                       <Iframe 
                         link={video?.link} 
                         title={video?.title} 
                         />
                       <h2 className={textStyles.title}>
                         {video?.title}
                       </h2> 
                       <p className={textStyles.title}>{video?.year}</p>        
                     </div>
                   ))}
                 </div> */}
        </main>
      ) : (<main>
              <h2 className={`${textStyles.textCenter }`}>
        In Production!
      </h2>
      <h3 className={`${textStyles.textCenter }`}>
        Coming Soon
      </h3>
      {/* <Image 
        width={250}
        height={300}
        style={{
          margin: 'auto',
          width: '250px',
          height:'auto',
        }}
        src="https://www.datocms-assets.com/53347/1698974110-turnaroundjoey.gif" 
        alt="360 view of the character Joey."
        placeholder='blur'
        blurDataURL={rgbDataURL(228, 220, 243)}
        loading='lazy'/> */}
        
      </main> )
      }
    </section>
  )
}

