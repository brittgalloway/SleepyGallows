import '@/app/style/globals.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio',
  description: "Showcase of Animation by Brittney Galloway and Illustration and Comics by Crystal Galloway.",
  keywords: "animation, sleepy gallows, brittney, crystal, galloway, art, necahual, elusive green elephant, plh",
  author:"Brittney Galloway",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

