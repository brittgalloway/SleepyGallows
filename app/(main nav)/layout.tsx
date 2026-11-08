import MainNavigation from '@/components/MainNavigation'
import { cinzel, lato } from '@/fonts'
import { type ReactNode } from 'react'

export default function MainNavLayout({ children }: { children: ReactNode }) {
  return (
      <section className={`wrapper ${cinzel.variable} ${lato.variable}`}>
        <MainNavigation/>
        {children}
      </section>
  )
}