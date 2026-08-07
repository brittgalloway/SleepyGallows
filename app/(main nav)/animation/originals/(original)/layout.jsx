import MainNavigation from '@/components/MainNavigation'
import AnimationNav from '@/components/Nav'
import { Footer } from '@/components/Footer'
import styles from '@/animation/page.module.scss'

export default function RootLayout({children}) {
  return (
      <>
        <MainNavigation/>
        <main className={styles.main}>
          <AnimationNav/>
          {children}
        </main>
        <Footer
          name={'Sleepy Gallows Studio'}
        />
      </>
  )
}

