import { year } from '@/lib/utils'
import { SOCIALS, type SocialKey } from '@/lib/socials'
import Beehiiv from './beehiiv'
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

export function Footer({
  name = 'Sleepy Gallows Studio',
  socials = ['youtube', 'instagram'],
}: {
  name?: string
  socials?: SocialKey[]
}) {
  return (
    <footer>
      <SocialMedia accounts={socials} />
      <Beehiiv />
      <small>Copyright © {year} <em>{name}</em> - All Rights Reserved.</small>
    </footer>
  )
}