import { cinzel_decorative } from "@/app/fonts"
import ShopHeader from "@/app/components/shopHeader"
import { ShopFooter } from "@/app/components/shopFooter"
import { ShopBanner } from "../components/shopBanner"
import styles from './page.module.scss'

export const metadata = {
  title: 'Shop | Sleepy Gallows',
  description: "Shop Sleepy Gallows merchandise.",
}

export default function ShopLayout({ children }) {
  return (
      <section style={cinzel_decorative.style}>
        <ShopBanner/>
        <ShopHeader/>
          {children}
        <ShopFooter/>
      </section>
  )
}
