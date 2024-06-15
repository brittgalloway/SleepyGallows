'use client'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { year } from '../utilities/formating'
import styles from '@/app/style/shopFooter.module.scss'

export function ShopFooter() {
    const isMobile = useMediaQuery({query: `(max-width: 830px)`});
    return (
     <footer className={styles.footer}>
        {isMobile ? 
            (<div className={styles.socials}>
                <a href='https://www.youtube.com/@sleepygallows'><FontAwesomeIcon icon={faYoutube} /></a>
                <a href='https://www.instagram.com/sleepy_gallows/'><FontAwesomeIcon icon={faInstagram} /></a>
              </div>) :
            null
        }
        <p className={styles.title}>Sleepy Gallows Studio</p>
        <ul className={styles.ul}>
            <li><Link href={'/animation'}>Animation</Link></li>
            <li><Link href={'/comics'}>Comics</Link></li>
            <li><Link href={'/art'}>Art</Link></li>
            <li><Link href={'/about'}>About</Link></li>
        </ul>
        <iframe title='Sign up for the Sleepy Gallows Newsletter' src='https://embeds.beehiiv.com/3178b493-940a-49e7-a1e0-c7095d94b9db?slim=true' loading="lazy" frameBorder={0} data-test-id='beehiiv-embed' ></iframe>
        <p>Copyright © {year} Sleepy Gallows Studio - All Rights Reserved.</p>
     </footer>
    );
  }