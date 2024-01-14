
import { lato } from '@/app/fonts'
import styles from './page.module.scss'
import textStyles from '@/app/style/titles.module.scss'

export default function Project({title, link, year, summary, website}) {
  return (
    <div className={`${styles.video} ${lato.className}`}>
        <iframe maxwidth={376} maxHeight={212} src={link} title={`Watch ${title}`}  frameborder="0" allowfullscreen></iframe>
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

