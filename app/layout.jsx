import { lato, cinzel_decorative } from '@/fonts'
import '@/style/globals.scss'
import { JsonLd, SITE_URL, ORG_ID, BRITTNEY_ID, CRYSTAL_ID } from '@/lib/jsonLd'
import { YOUTUBE, INSTAGRAM, TUMBLR, KOFI, BLUESKY, GITHUB, LINKEDIN } from '@/lib/data'

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Sleepy Gallows Studio',
      url: SITE_URL,
      logo: `${SITE_URL}/android-chrome-512x512.png`,
      email: 'support@sleepygallows.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Evanston', addressRegion: 'IL', addressCountry: 'US' },
      founder: [{ '@id': BRITTNEY_ID }, { '@id': CRYSTAL_ID }],
      sameAs: [YOUTUBE, INSTAGRAM, TUMBLR, KOFI],
    },
    {
      '@type': 'Person',
      '@id': BRITTNEY_ID,
      name: 'Brittney Galloway',
      jobTitle: 'Animator',
      worksFor: { '@id': ORG_ID },
      sameAs: [BLUESKY, GITHUB, LINKEDIN],
    },
    {
      '@type': 'Person',
      '@id': CRYSTAL_ID,
      name: 'Crystal Galloway',
      jobTitle: 'Illustrator',
      worksFor: { '@id': ORG_ID },
      sameAs: ['https://www.candyfluffs.com/'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Sleepy Gallows Studio',
      url: SITE_URL,
      publisher: { '@id': ORG_ID },
    },
  ],
}

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
        <JsonLd data={siteJsonLd} />
        {children}
      </body>
    </html>
  )
}

