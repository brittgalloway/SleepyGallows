import { cinzel_decorative, lato } from './fonts'
import Link from 'next/link'
import styles from './style/404.module.scss'

export default async function NotFound() {
  return (
    <section className={`${styles.section} ${lato.className}`}>
        <h1 className={`${styles.h1} ${cinzel_decorative.className}`}>Page not found</h1>
        <p>
          Sorry
          <br/>
          we couldn’t find what you were looking for.
          <br/>
        </p>
        <Link className={styles.a} href="/">Return Home</Link>.
    </section>
  )
}