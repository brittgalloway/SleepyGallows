import '@/style/globals.scss'

export const metadata = {
  applicationName: 'Sleepy Gallows',
  title: 'Sleepy Gallows Studio',
  description: 'Showcase of Animation by Brittney Galloway and Illustration and Comics by Crystal Galloway.',
  keywords: 'animation, sleepy gallows, brittney galloway, crystal galloway, galloway sisters , art, chicago artist, evanston artist, necahual, elusive green elephant, plh, for peace love and harmony',
  author:'Brittney Galloway',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    },
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

