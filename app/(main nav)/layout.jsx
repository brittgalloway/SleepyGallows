import MainNavigation from '@/components/MainNavigation'
import '@/style/globals.scss'

export default function MainNavLayout({ children }) {
  return (
      <section className={`wrapper`} >
        <MainNavigation/>
        {children}
      </section>
  )
}

