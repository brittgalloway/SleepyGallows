import { lato } from '@/app/fonts'
import MainNavigation from '@/app/components/MainNavigation'
import '../style/globals.scss'
export default function MainNavLayout({ children }) {
  return (
    <>
      <MainNavigation/>
      <section className={lato.className}>{children}</section>
    </>
  )
}

