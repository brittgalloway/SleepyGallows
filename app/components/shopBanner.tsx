import styles from '@/style/shopBanner.module.scss'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../sanity/lib/client'

  const POSTS_QUERY = await `*[
    _type == "announcement"
  ] 
  {}`;

export async function ShopBanner() {
    
  const banners = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <aside className={styles.aside}>
      <div className={styles.announcementWrapper}>
        {banners.map((message, index) => {
          return (
            <p key={message.id} className={styles.announcementText} style={{ animationDelay: `${(index * 10) * (1 / banners.length)}s` }}>
              {message.announcementBanner}
            </p>
          )}
        )}
      </div>
    </aside>
  )
}