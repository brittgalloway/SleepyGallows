import Image from 'next/image'
import { performRequest } from '@/app/lib/datocms'
import { cinzel_decorative } from '@/app/fonts'
import OriginalsNav from '@/app/components/originalsNav'
import styles from '../../../page.module.scss'
import textStyles from '@/app/style/titles.module.scss'

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
    <main style={{display: 'flex', flexDirection: 'column'}}>
      <header>
        <OriginalsNav 
          navLabel={original?.link}/>
        <h1 className={`${textStyles.textCenter } ${cinzel_decorative.className}`}>{original?.name}</h1>
      </header>
      <h2 className={`${textStyles.textCenter }`}>
        In Production!
      </h2>
      <h3 className={`${textStyles.textCenter }`}>
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
        alt="360 view of the character Joey."/>
      {/* {original.watch.map((video)=> (
        <div>
          <iframe maxwidth={376} maxHeight={212} src={video.link} title={"Watch "+ video.title} frameBorder="0" allowFullScreen></iframe>
            <h2>
              {video.title}
            </h2> 
            <p>{video.year}</p> 
        </div>
      ))} */}
    </main>
  )
}

