import { performRequest } from '@/lib/datocms'
import styles from '@/style/shopBanner.module.scss'
const PAGE_CONTENT_QUERY = `
    query Banner {
        allAnnouncements(orderBy: _createdAt_ASC) {
            id
            announcementBanner
        }
    }
`;

export async function ShopBanner() {
    
  const { data: { allAnnouncements } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <aside className={styles.aside}>
      <div className={styles.announcementWrapper}>
        {allAnnouncements.map((message, index) => {
          return (
            <p key={message.id} className={styles.announcementText} style={{ animationDelay: `${(index * 10) * (1 / allAnnouncements.length)}s` }}>
              {message.announcementBanner}
            </p>
          )}
        )}
      </div>
    </aside>

  )
}