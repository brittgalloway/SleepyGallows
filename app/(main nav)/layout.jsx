import { cinzel_decorative, lato } from '@/fonts'
import MainNavigation from '@/components/MainNavigation'
import '@/style/globals.scss'

export default function MainNavLayout({ children }) {
  return (
      <section className={`${cinzel_decorative.variable} ${lato.variable} wrapper`} >
        <MainNavigation/>
        {children}
      </section>
  )
}

