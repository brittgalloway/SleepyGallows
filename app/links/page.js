import { cinzel_decorative, lato } from '@/app/fonts'
import Link from 'next/link'
import styles from './page.module.scss'

export const metadata = {
    title: 'Sleepy Gallows Studio | Links',
    description: "Collection of important Sleepy Gallows links."
  }

export default function Links() {
    return (
        <main className={`${styles.main} ${lato.className}`}>
            <h1 className={`${styles.h1} ${cinzel_decorative.className}`}>Sleepy Gallows Links</h1>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link className={styles.a} href="/">Offical Website</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href="/shop">Join the Newsletter</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href="https://www.candyfluffs.com/2heroes">2Heroes Necahual</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href="https://www.patreon.com/2heroes">2Heroes Patreon</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href="https://ko-fi.com/sleepygallows">Ko-fi</Link>
                    </li>
                    <li className={styles.li}>
                        <Link className={styles.a} href="https://brittgalloway.github.io/memory_game/">PLH Memory Game</Link>
                    </li>
                </ul>
            </nav>
        </main>
    )
}