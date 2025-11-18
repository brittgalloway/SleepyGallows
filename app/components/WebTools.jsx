import Image from 'next/image'
import tools from '@/json/tools.json'
import styles from '@/webdev/page.module.scss'
import textStyles from '@/style/titles.module.scss'

export default function  WebTools() {

    return (
      <section className={styles.toolsSection}>
        <h2 className={textStyles.grandstander}>My Tools</h2>
        <ul className={styles.ul}>
          {tools.map((tool) => (
            <li key={tool?.title}>
              <Image 
                width={77}
                height={77}
                alt={`${tool?.title} logo`}
                src={tool?.src} 
              />
              {tool?.title}
            </li>
          ))}
        </ul>
      </section>
    )
  }