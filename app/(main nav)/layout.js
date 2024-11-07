import { lato } from '@/fonts'
import MainNavigation from '@/components/MainNavigation'
import '@/style/globals.scss'

export default function MainNavLayout({ children }) {
  return (
    <>
      <MainNavigation/>
      <section className={lato.className}>{children}</section>
    </>
  )
}

