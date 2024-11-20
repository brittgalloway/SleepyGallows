import { cinzel } from '@/fonts'
import ShopHeader from "@/components/shopHeader"
import { ShopFooter } from "@/components/shopFooter"
import { ShopBanner } from "@/components/shopBanner"
import { StateProvider } from "./cartContext"

export const metadata = {
  title: 'Shop | Sleepy Gallows',
  description: "Shop Sleepy Gallows merchandise.",
}

export default function ShopLayout({ children }) {
  return (
    <StateProvider>
      <section style={cinzel.style}>
        <ShopBanner/>
        <ShopHeader/>
          {children}
        <ShopFooter/>
      </section>
    </StateProvider>
  )
}
