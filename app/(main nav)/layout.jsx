import MainNavigation from '@/components/MainNavigation'

export default function MainNavLayout({ children }) {
  return (
      <section className={`wrapper`} >
        <MainNavigation/>
        {children}
      </section>
  )
}

