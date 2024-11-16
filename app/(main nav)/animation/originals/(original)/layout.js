import { lato } from '@/fonts'
import MainNavigation from '@/components/MainNavigation'
import AnimationNav from '@/components/Nav'
import { Footer } from '@/components/Footer'
import '@/style/globals.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio',
  description: "Showcase of Animation by Brittney Galloway and Crystal Galloway.",
  keywords: "animation, sleepy gallows, brittney, crystal, galloway, art, elusive green elephant, plh",
}

export default function RootLayout({children}) {
  return (
      <>
        <MainNavigation/>
        <main className={lato.className}>
            <AnimationNav/>
            {children}
        </main>
        <Footer
          name={'Sleepy Gallows'}
        />
      </>
  )
}

