import Iframe from '@/components/Iframe'
import styles from './page.module.scss'
import textStyles from '@/style/titles.module.scss'

export default function Project({title, link, year, summary, website = ''}) {
  return (
    <figure className={`${styles.video}`}>
        <Iframe 
          link={link} 
          title={title} 
          />
        <details>
            <summary className={`${textStyles.lato}`}>
            {title}
            </summary>
            <p className={`${textStyles.lato}`}>{year}</p> 
            {website ? (<p><a href={website}>{website}</a></p>) : null}
            <p className={`${textStyles.lato}`}>{summary}</p> 
        </details>
    </figure>
  )
}

