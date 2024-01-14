import { heebo } from "@/app/fonts"
import styles from './page.module.scss'

export const metadata = {
  title: 'Brittney Galloway | Web Developer',
  description: "Frontend Web Development by Brittney Galloway.",
  keywords: "brittney galloway, frontend, web development",
  author:"Brittney Galloway",
}
const year = new Date().getFullYear();

export default function WebLayout({ children }) {
  return (
      <section style={heebo.style}>
        {children}
        <footer className={styles.footer}>Brittney Galloway | {year} | Made with Next.js</footer>
      </section>
  )
}
