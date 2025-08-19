import {defineField, defineType} from 'sanity'

export const brittneyArt = defineType({
  name: 'brittneyArt',
  title: 'Brittney\'s Art',
  type: 'document',
  fields: [
    defineField({
        name: 'drawingsTitle',
        type: 'string',
        description: 'Title and slug',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'drawingsGallery',
        type: 'reference', 
        to: [{type: 'imageGallery'}],
        description: 'These should be the finished, non-collage 2D work',
        
    }),
    defineField({
        name: 'collageTitle',
        type: 'string',
        description: 'Title and slug',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'collageGallery',
        type: 'reference', 
        to: [{type: 'imageGallery'}],
        description: 'These should be the finished, non-collage 2D work',
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'publishedAt',
        type: 'datetime',
        initialValue: () => new Date().toISOString(),
        validation: (rule) => rule.required(),
    }),
],
})