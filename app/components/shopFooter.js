'use client'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import styles from '@/app/style/shopFooter.module.scss'

export function ShopFooter() {
    const isMobile = useMediaQuery({query: `(max-width: 830px)`});
    const year = new Date().getFullYear();
    return (
     <footer className={styles.footer}>
        {isMobile ? 
            <span>Social media</span> :
            null
        }
        <p className={styles.title}>Sleepy Gallows Studio</p>
        <ul className={styles.ul}>
            <li><Link href={'/animation'}>Animation</Link></li>
            <li><Link href={'/comics'}>Comics</Link></li>
            <li><Link href={'/art'}>Art</Link></li>
            <li><Link href={'/about'}>About</Link></li>
        </ul>
        <iframe src='https://embeds.beehiiv.com/3178b493-940a-49e7-a1e0-c7095d94b9db?slim=true' frameBorder={0} data-test-id='beehiiv-embed' ></iframe>
        <p>Copyright © {year} Sleepy Gallows Studio - All Rights Reserved.</p>
     </footer>
    );
  }