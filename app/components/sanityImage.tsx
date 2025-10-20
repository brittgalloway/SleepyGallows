import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { urlFor } from '../../sanity/lib/image'

type SanityImage = {
    image: SanityImageObject,
    altText: string
}
export default function ImageComponent({image, altText}: SanityImage) {
  return (
    <img 
      src={urlFor(image)
        .url()}
      alt={`Reads as: "${altText}"`}
    />
  )
}