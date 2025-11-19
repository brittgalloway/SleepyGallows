import MainNavigation from '@/components/MainNavigation'
import AnimationNav from '@/components/Nav'
import { Footer } from '@/components/Footer'
import styles from '@/animation/page.module.scss'
import '@/style/globals.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Originals',
  description: 'Showcase of Animation by Brittney Galloway and Crystal Galloway.',
  keywords: 'animation, sleepy gallows, brittney, crystal, galloway, art, elusive green elephant, plh, chicago artist, evanston artist, black artist',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <MainNavigation/>
        <main className={styles.main}>
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

