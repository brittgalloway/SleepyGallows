

import { lato } from '@/fonts'
import Iframe from '@/components/Iframe'
import styles from './page.module.scss'
import textStyles from '@/style/titles.module.scss'

export default function Project({title, link, year, summary, website = ''}) {
  return (
    <figure className={`${styles.video} ${lato.className}`}>
        <Iframe 
          link={link} 
          title={title} 
          />
        <details>
            <summary className={textStyles.title}>
            {title}
            </summary>
            <p>{year}</p> 
            {website ? (<p><a href={website}>{website}</a></p>) : null}
            <p>{summary}</p> 
        </details>
    </figure>
  )
}

