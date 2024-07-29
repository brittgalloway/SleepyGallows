import { grandstander } from '@/app/fonts'
import Image from 'next/image'
import tools from '@/app/json/tools.json'
import styles from './page.module.scss'


export default function  WebTools() {

    return (
      <section className={styles.toolsSection}>
        <h2 className={grandstander.className}>My Tools</h2>
        <ul className={styles.ul}>
          {tools.map((tool) => (
            <li key={tool.title}>
              <Image 
                  width={77}
                  height={77}
                  title={tool.title} 
                  alt={`${tool.title} logo`}
                  src={tool.src} />
                  {tool.title}
            </li>
              ))}
        </ul>
      </section>
    )
  }