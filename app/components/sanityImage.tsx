import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { urlFor } from '../../sanity/lib/image'

export default function ImageComponent({image, altText}: {image: SanityImageSource, altText: string}) {
  return (
    <img 
      src={urlFor(image)
        .url()}
      alt={`Reads as: "${altText}"`}
    />
  )
}