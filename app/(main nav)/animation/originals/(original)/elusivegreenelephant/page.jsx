import Image from 'next/image'
import { cinzel_decorative } from '@/fonts'
import { performRequest } from '@/lib/datocms'
import { rgbDataURL } from '@/lib/utils'
import OriginalsNav from '@/components/OriginalsNav'
import styles from '@/animation/page.module.scss'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | The Elusive Green Elephant',
  description: "The Elusive Green Elephant is a short Animated film created by the Sleepy Gallows. Learn about the concept and the see related art.",
  keywords: "animation, sleepy gallows, elusive green elephant",
}

const PAGE_CONTENT_QUERY = `
query Watch{
  original(filter: {name: {eq: "The Elusive Green Elephant"}}) {
    link
    name
    watch {
      year
      updatedAt
      title
      link
      id
    }
  }
}
`;
export default async function EgeWatch() {
  const { data: { original } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <section style={{display: 'flex', flexDirection: 'column'}}>
      <header>
        <OriginalsNav 
          navLabel={original.link}/>
        <h1 className={`${textStyles.text_center } ${cinzel_decorative.className}`}>{original.name}</h1>
      </header>
      <h2 className={`${textStyles.text_center }`}>
        In Production!
      </h2>
      <h3 className={`${textStyles.text_center }`}>
        Coming Soon
      </h3>
      <Image 
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
        loading='lazy'/>
        
      {/* {original.watch.map((video)=> (
        <div>
          <Iframe 
              link={video?.link} 
              title={video?.title} 
              />
            <h2>
              {video.title}
            </h2> 
            <p>{video.year}</p> 
        </div>
      ))} */}
    </section>
  )
}

