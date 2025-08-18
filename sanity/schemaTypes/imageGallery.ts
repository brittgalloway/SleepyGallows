import {defineField, defineType} from 'sanity'

export const imageGallery = defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isCrystalIllustration',
      type: 'boolean',
      description: 'True if this is a crystal illustration gallery',
    }),
    defineField({
      name: 'isMermaidVisDev',
      type: 'boolean',
      description: 'True if this is a mermaid visual developement gallery',
    }),
    defineField({
      name: 'isGeneralVisDev',
      type: 'boolean',
      description: 'True if this is a visual developement gallery',
    }),
    defineField({
      name: 'isBrittneyDrawing',
      type: 'boolean',
      description: 'True if this is Brittney\'s drawing gallery',
    }),
    defineField({
      name: 'isBrittneyCollage',
      type: 'boolean',
      description: 'True if this is Brittney\'s collage gallery',
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{type: 'image'}],
      validation: (rule) => rule.required(),
    }),
  ],
})