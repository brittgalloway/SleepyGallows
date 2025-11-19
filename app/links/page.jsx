import Link from 'next/link'
import styles from './page.module.scss'
import { KOFI, NEWSLETTER, YOUTUBE, INSTAGRAM, NECAHUAL, BLUESKY, TUMBLR } from '@/lib/data'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
    title: 'Sleepy Gallows Studio | Links',
    description: "Collection of important Sleepy Gallows links."
  }

export default function Links() {
    const links = [
        ['/', 'Offical Website'],
        ['https://www.prettyprismtarot.com/', 'Pretty Prism Tarot'],
        [KOFI, 'Ko-fi'],
        [NEWSLETTER, 'The Newsletter'],
        [YOUTUBE, 'YouTube'],
        [INSTAGRAM, 'Instagram'],
        [BLUESKY, 'Bluesky'],
        [TUMBLR, 'Tumblr'],
        [NECAHUAL, '2Heroes Necahual'],
        ['/webdev', 'Web Development'],
    ];
    return (
        <main className={`${styles.main} ${textStyles.lato}`}>
            <h1 className={`${styles.h1} ${textStyles.cinzelDec}`}>Sleepy Gallows Links</h1>
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
