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
        ['https://www.prettyprismtarot.com/', 'Pretty Prism Tarot'],
        ['https://ko-fi.com/sleepygallows', 'Ko-fi'],
        ['https://sleepygallows.beehiiv.com/', 'The Newsletter'],
        ['https://www.youtube.com/@sleepygallows', 'YouTube'],
        ['https://www.instagram.com/sleepy_gallows/', 'Instagram'],
        ['https://bsky.app/blgalloway.bsky.social', 'Bluesky'],
        ['https://sleepygallows.tumblr.com/', 'Tumblr'],
        ['https://www.candyfluffs.com/2heroes', '2Heroes Necahual'],
        ['/webdev', 'Web Development'],
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
