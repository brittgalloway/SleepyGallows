import MainNavigation from '@/components/MainNavigation'
import { type ReactNode } from 'react'

export default function MainNavLayout({ children }: { children: ReactNode }) {
  return (
      <section className={`wrapper`} >
        <MainNavigation/>
        {children}
      </section>
  )
}