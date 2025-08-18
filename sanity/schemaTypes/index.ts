import { type SchemaTypeDefinition } from 'sanity'
import { animatedWork } from './animatedWork'
import { imageGallery } from './imageGallery'
import { webProject } from './webProject'
import { original } from './original'
import { announcement } from './announcementBanner'
import { storySummary } from './storySummary'
import { patron } from './patron'
import { shopProduct } from './shopProduct'
import { brittneyArt } from './brittneyArt'
import { crystalArt } from './crystalArt'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    animatedWork,
    imageGallery,
    webProject,
    original,
    announcement,
    storySummary,
    patron,
    shopProduct,
    brittneyArt,
    crystalArt
  ],
}
