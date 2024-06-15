import { performRequest } from '@/app/lib/datocms'
import styles from '@/app/style/shopBanner.module.scss'
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
      <aside className={`${styles.aside}`}>
        {allAnnouncements.map((message)=>(
           <p key={message?.id}>{message?.announcementBanner}</p>
        ))}
    </aside>
  )
}