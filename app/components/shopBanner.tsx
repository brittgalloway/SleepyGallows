import styles from '@/style/shopBanner.module.scss'
import { client } from 'b/sanityLib/client'

type Banner = {
  id: string
  body: string
}

export async function ShopBanner() {
  const POSTS_QUERY = `*[
    _type == "announcement"
  ] 
  {
    "id": _id,
    "body": body,
  }`;
    
  const banners = await client.fetch<Banner[]>(POSTS_QUERY, {});
  return (
    banners[0] !== undefined && 
    <aside className={styles.aside}>
      <div className={styles.announcementWrapper}>
        {banners.map((message, index) => {
          return (
            <p key={message.id} className={styles.announcementText} style={{ animationDelay: `${(index * 10) * (1 / banners.length)}s` }}>
              {message.body}
            </p>
          )}
        )}
      </div>
    </aside>
  )
}