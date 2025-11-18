import { year } from '@/lib/utils'
import styles from './page.module.scss'

export const metadata = {
  title: 'Brittney Galloway | Frontend Web Developer',
  description: 'Frontend Web Development by Brittney Galloway.',
  keywords: 'brittney galloway, frontend, web development, chicago developer',
}

export default function WebLayout({ children }) {
  return (
      <section>
        {children}
        <footer className={styles.footer}>Brittney Galloway | {year} | Made with Next.js</footer>
      </section>
  )
}
