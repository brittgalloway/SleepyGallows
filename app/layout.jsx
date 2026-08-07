import { lato, cinzel_decorative } from '@/fonts'
import '@/style/globals.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Art of Brittney and Crystal Galloway | Chicago Artists',
  description: 'Showcase of Animation by Brittney Galloway and Illustration and Comics by Crystal Galloway. Find Crystal\'s Necahual or one of Brittney\'s many animations.',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1.0,
  maximumScale: 5.0,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={lato.style} className={`${cinzel_decorative.variable}`}>
        {children}
      </body>
    </html>
  )
}

