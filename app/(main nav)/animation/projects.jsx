import { YouTubeEmbed } from '@next/third-parties/google'
import { lato } from '@/app/fonts'
import styles from './page.module.scss'
import textStyles from '@/app/style/titles.module.scss'

export default function Project({title, link, year, summary, website, isYoutube, youtubeId}) {
  return (
    <div className={`${styles.video} ${lato.className}`}>
      {isYoutube ? <YouTubeEmbed videoid={youtubeId} width={300} height={169}/> : <iframe maxwidth={376} maxheight={212} src={link} title={`Watch ${title}`} loading="lazy" frameBorder="0" allowFullScreen></iframe>}
        <details>
            <summary className={textStyles.title}>
            {title}
            </summary>
            <p>{year}</p> 
            {website ? (<p><a href={website}>{website}</a></p>) : null}
            <p>{summary}</p> 
        </details>
    </div>
  )
}

