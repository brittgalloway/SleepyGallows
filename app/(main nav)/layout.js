import { lato } from '@/fonts'
import MainNavigation from '@/components/MainNavigation'
import '@/style/globals.scss'

export default function MainNavLayout({ children }) {
  return (
      <section className={`${lato.className} wrapper`}>
        <MainNavigation/>
        {children}
      </section>
  )
}

