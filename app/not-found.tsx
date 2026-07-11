import Link from 'next/link'
import { cinzel_decorative, lato } from '@/fonts'
import styles from '@/style/404.module.scss'
import textStyles from '@/style/titles.module.scss'

export default async function NotFound() {
  return (
    <section className={`${styles.section} ${textStyles.lato}`}>
        <h1 className={`${styles.h1} ${textStyles.cinzelDec}`}>Page not found</h1>
        <p>
          Sorry
          <br/>
          we couldn’t find what you were looking for.
          <br/>
        </p>
        <p>Let’s <Link className={styles.a} href="/">Return Home</Link>.</p>
    </section>
  )
}