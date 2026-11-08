import Link from 'next/link'
import { year } from '@/lib/utils'
import { SOCIALS, type SocialKey } from '@/lib/socials'
import Beehiiv from './beehiiv'
import { NEWSLETTER } from '@/lib/data'
import styles from '@/style/shopFooter.module.scss'

export function SocialMedia({ accounts }: { accounts: SocialKey[] }) {
  return (
    <ul className={styles.socials}>
      {accounts.map((key) => {
        const { href, platform, handle, icon } = SOCIALS[key]
        return (
          <li key={key}>
            <a
              className={styles.icons}
              href={href}
              aria-label={`${handle} on ${platform}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
const legalLinks = [['terms', 'terms and Conditions'], ['refund', 'refund policy'], ['shipping', 'shipping']];
export function LegalLinks() {
  return (
  <>
    <h2 className={styles.title}>Legal Links</h2>
    <ul className={styles.ul}>
      {legalLinks.map((link, index)=> (
        <li key={index}>
            <Link href={`/${link[0]}`}>{link[1]}</Link>
        </li>
      ))}
    </ul>
  </>
  )
}
const navLinks = ['animation', 'comics', 'art', 'about'];
export function NavLinks() {
  return (
    <ul className={styles.ul}>
        { navLinks.map((link, index) =>(
          <li key={index}><Link href={`/${link}`}>{link}</Link></li>
        ))
      }
      <li><Link href={NEWSLETTER}>blog</Link></li>
    </ul>
  )
}
export function Footer({
  name = 'Sleepy Gallows Studio',
  socials = ['youtube', 'instagram'],
}: {
  name?: string
  socials?: SocialKey[]
}) {
  return (
    <footer className={`${styles.footer}`}>
      <SocialMedia accounts={socials} />
      <NavLinks/>
      <Beehiiv />
      <LegalLinks/>
      <p>Copyright © {year} <em>{name}</em> - All Rights Reserved.</p>
    </footer>
  )
}