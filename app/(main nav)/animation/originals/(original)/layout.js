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
    <html lang="en">
      <body className={lato.className}>
        <MainNavigation/>
        <main>
            <AnimationNav/>
            {children}
        </main>
        <Footer
          name={'Sleepy Gallows'}
        />
      </body>
    </html>
  )
}

