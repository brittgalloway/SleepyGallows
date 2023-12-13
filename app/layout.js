import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sleepy Gallows Studio',
  description: "Showcase of Animation and Web development by Brittney Galloway and Illustration and Comics by Crystal Galloway.",
  keywords: "animation, sleepy gallows, brittney, crystal, galloway, art, necahual",
  author:"Brittney Galloway",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
