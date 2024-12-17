import Link from 'next/link'
import { cinzel_decorative, lato } from '@/fonts'
import styles from './page.module.scss'

export const metadata = {
    title: 'Sleepy Gallows Studio | Links',
    description: "Collection of important Sleepy Gallows links."
  }

export default function Links() {
    const links = [
        ['/', 'Offical Website'],
        ['/shop', 'Join the Newsletter'],
        ['https://www.candyfluffs.com/2heroes', '2Heroes Necahual'],
        ['https://www.patreon.com/2heroes', '2Heroes Patreon'],
        ['https://ko-fi.com/sleepygallows', 'Ko-fi'],
        ['https://brittgalloway.github.io/memory_game/', 'PLH Memory Game'],
    ];
    return (
        <main className={`${styles.main} ${lato.className}`}>
            <h1 className={`${styles.h1} ${cinzel_decorative.className}`}>Sleepy Gallows Links</h1>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    {links.map((link, index)=> (
                        <li key={index} className={styles.li}>
                            <Link className={styles.a} href={link[0]}>{link[1]}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </main>
    )
}