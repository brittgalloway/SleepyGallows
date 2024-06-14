import { ProductCategory } from '../components/productCategory';
import styles from './page.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Shop',
  description: "The Sleepy Gallows e-commerce store. Soon to launch, for now sign up for the newsletter",
  keywords: "shop, art, art prints, sleepy gallows",
}
const PAGE_CONTENT_QUERY_ex = `
query Shop {
  allShops(orderBy: _createdAt_ASC) {
    originalsTitle
    productDescription(markdown: true)
    productName
    productSlug
    productType
    variations {
      id
      productImages {
        alt
        height
        id
        title
        url
        width
      }
      title
      unitPrice
      discountPrice
    }
    originalsSummary {
      id
      storyName
      storySummary {
        links
        value
      }
    }
    id
  }
}
`;

export default async function Shop() {
  return (
    <main className={styles.main}>
        <p>Welcome to our whimsical world of art and wonder. Explore charming fine art, adorable prints, captivating children&apos;s books, and cute downloadable assets, all crafted to ignite your imagination and fill your world with magic.</p>
        <ProductCategory/>
    </main>
  )
}