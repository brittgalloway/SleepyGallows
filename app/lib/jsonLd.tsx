// General website
export const SITE_URL = 'https://www.sleepygallows.com'

export const ORG_ID = `${SITE_URL}/#organization`
export const BRITTNEY_ID = `${SITE_URL}/#brittney`
export const CRYSTAL_ID = `${SITE_URL}/#crystal`

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

// Artist pages
type GalleryPhoto = { caption?: string; alt: string; asset: { url: string } }
type Artist = { id: string; name: string }

export const BRITTNEY: Artist = { id: BRITTNEY_ID, name: 'Brittney Galloway' }
export const CRYSTAL: Artist = { id: CRYSTAL_ID, name: 'Crystal Galloway' }
export const STUDIO: Artist = { id: ORG_ID, name: 'Sleepy Gallows Studio' }

export function galleryJsonLd(name: string, path: string, artist: Artist, photos: GalleryPhoto[] = []) {
  const creator = {
    '@type': artist.id === ORG_ID ? 'Organization' : 'Person',
    '@id': artist.id,
    name: artist.name,
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name,
    url: `${SITE_URL}${path}`,
    author: creator,
    image: photos.map((p) => ({
      '@type': 'ImageObject',
      contentUrl: p.asset.url,
      name: p.caption || p.alt,
      description: p.alt,
      creator,
      creditText: artist.name,
      copyrightNotice: `© ${artist.name}`,
    })),
  }
}

// Originals
export const originalId = (link: string) => `${SITE_URL}/animation/originals/${link}#work`

export function originalJsonLd(o: { title: string; link: string; thumbnailUrl?: string; description?: string }) {
  return {
    '@type': 'CreativeWork',
    '@id': originalId(o.link),
    name: o.title,
    url: `${SITE_URL}/animation/originals/${o.link}`,
    genre: 'Animation',
    ...(o.thumbnailUrl && { image: o.thumbnailUrl }),
    ...(o.description && { description: o.description }),
    creator: { '@type': 'Organization', '@id': ORG_ID, name: 'Sleepy Gallows Studio' },
  }
}

// Videos
type Video = { title: string; link: string; summary?: string; uploadDate?: string }

const youtubeThumbnail = (link: string) => {
  const id = link.match(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]{11})/)?.[1]
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined
}

export function videoObjects(videos: Video[] = [], fallbackThumbnail?: string) {
  return videos
    .filter((v) => v.uploadDate)
    .map((v) => ({
      '@type': 'VideoObject',
      name: v.title,
      description: v.summary || v.title,
      uploadDate: v.uploadDate,
      thumbnailUrl: youtubeThumbnail(v.link) ?? fallbackThumbnail,
      embedUrl: v.link,
      creator: { '@type': 'Organization', '@id': ORG_ID, name: 'Sleepy Gallows Studio' },
    }))
    .filter((v) => v.thumbnailUrl)
}