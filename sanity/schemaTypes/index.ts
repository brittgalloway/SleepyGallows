import { type SchemaTypeDefinition } from 'sanity'
import { animatedWork } from './animatedWork'
import { imageGallery } from './imageGallery'
import { webProject } from './webProject'
import { original } from './original'
import { announcement } from './announcementBanner'
import { storySummary } from './storySummary'
import { textBlock } from './textBlock'
import { shopProduct } from './shopProduct'
import { crystalArt } from './crystalArt'
import { staticImage } from './staticImage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    animatedWork,
    imageGallery,
    webProject,
    original,
    announcement,
    storySummary,
    textBlock,
    shopProduct,
    crystalArt,
    staticImage
  ],
}
