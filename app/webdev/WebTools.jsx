import Image from 'next/image'
import tools from '@/app/json/tools.json'
import styles from './page.module.scss'
import textStyles from '@/style/titles.module.scss'


export default function  WebTools() {

    return (
      <section className={styles.toolsSection}>
        <h2 className={textStyles.grandstander}>My Tools</h2>
        <ul className={styles.ul}>
          {tools.map((tool) => (
            <li key={tool.title} className={textStyles.grandstander}>
              <Image 
                width={77}
                height={77}
                alt={`${tool.title} logo`}
                src={tool.src} 
              />
              {tool.title}
            </li>
          ))}
        </ul>
      </section>
    )
  }