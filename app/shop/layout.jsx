import { cinzel, lato } from '@/fonts'
import ShopHeader from '@/components/shopHeader'
import { ShopFooter } from '@/components/shopFooter'
import { ShopBanner } from '@/components/shopBanner'
import { StateProvider } from './cartContext'


export default function ShopLayout({ children }) {
  return (
    <StateProvider>
      <section className={`${cinzel.variable} ${lato.variable}`}>
        <ShopBanner/>
        <ShopHeader/>
          {children}
        <ShopFooter/>
      </section>
    </StateProvider>
  )
}
