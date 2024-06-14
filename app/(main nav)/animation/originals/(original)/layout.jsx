import { lato } from '@/app/fonts'
import MainNavigation from '@/app/components/MainNavigation'
import AnimationNav from '@/app/components/nav'
import { Footer } from '@/app/components/footer'
import '@/app/style/globals.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio',
  description: "Showcase of Animation by Brittney Galloway and Crystal Galloway.",
  keywords: "animation, sleepy gallows, brittney, crystal, galloway, art, elusive green elephant, plh",
}

export default function RootLayout({children}) {
  return (
      <section className={lato.className}>
        <MainNavigation/>
        <section>
            <AnimationNav/>
            {children}
        </section>
        <Footer
          name={'Sleepy Gallows'}
        />
      </section>
  )
}

