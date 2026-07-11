import Link from 'next/link'
import styles from './page.module.scss'
import { KOFI, NEWSLETTER, YOUTUBE, INSTAGRAM, NECAHUAL, TUMBLR } from '@/lib/data'
import textStyles from '@/style/titles.module.scss'

export const metadata = {
    title: 'Sleepy Gallows Studio | Links',
    description: "Collection of important Sleepy Gallows links."
  }

const internalLinks = [
  ['/', 'Official Website'],
  ['/webdev', 'Web Development'],
];

const externalLinks = [
  ['https://www.prettyprismtarot.com/', 'Pretty Prism Tarot'],
  [KOFI, 'Ko-fi'],
  [NEWSLETTER, 'The Newsletter'],
  [YOUTUBE, 'YouTube'],
  [INSTAGRAM, 'Instagram'],
  ['https://bsky.app/profile/blgalloway.bsky.social', 'Bluesky'],
  [TUMBLR, 'Tumblr'],
  [NECAHUAL, '2Heroes Necahual'],
];

export default function Links() {
    return (
        <main className={`${styles.main} ${textStyles.lato}`}>
            <h1 className={`${styles.h1} ${textStyles.cinzelDec}`}>Sleepy Gallows Links</h1>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    {internalLinks.map((link, index) => (
                        <li key={`internal-${index}`} className={styles.li}>
                            <Link className={styles.a} href={link[0]}>{link[1]}</Link>
                        </li>
                    ))}
                    {externalLinks.map((link, index) => (
                        <li key={`external-${index}`} className={styles.li}>
                            <a className={styles.a} href={link[0]} rel="noopener noreferrer">{link[1]}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </main>
    )
}