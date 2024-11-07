import { heebo } from "@/fonts"
import styles from './page.module.scss'

export const metadata = {
  title: 'Brittney Galloway | Frontend Web Developer',
  description: "Frontend Web Development by Brittney Galloway.",
  keywords: "brittney galloway, frontend, web development, javascript developer, javascript, css3, html5, sass, es6, node.js, git, jquery, graphql, react.js, webpack, next.js, figma, vercel, adobe creative suite",
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
