import { urlFor } from '../../sanity/lib/image'
import {SanityImage} from '@/lib/types'

export default function ImageComponent({image, altText}: SanityImage) {
  return (
    <img 
      src={urlFor(image)
        .url()}
      alt={`Reads as: "${altText}"`}
    />
  )
}