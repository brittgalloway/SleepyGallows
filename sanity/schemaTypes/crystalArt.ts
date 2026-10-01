import {defineField, defineType} from 'sanity'

export const crystalArt = defineType({
  name: 'crystalArt',
  title: 'Crystal\'s Art',
  type: 'document',
  fields: [
    defineField({
        name: 'ilustration',
        type: 'string',
        description: 'Title and slug',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'illustrationGallery',
        type: 'reference', 
        to: [{type: 'imageGallery'}],
        description: 'These should be finished illustrations of Crystal',
        
    }),
    defineField({
        name: 'mermaidTitle',
        type: 'string',
        description: 'Title',
        validation: (rule) => rule.required(),
    }),
    defineField({
            name: 'MermaidDescription',
            type: 'array',
            of: [{type: 'block'}],
            validation: (rule) => rule.required(),
        }),
    defineField({
        name: 'mermaidGallery',
        type: 'reference', 
        to: [{type: 'imageGallery'}],
        description: 'These should be the desi mermaid character concept art',
        
    }),
    defineField({
        title: 'Visual Development',
        name: 'visualDevelopment',
        type: 'string',
        description: 'Title and slug',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'visDevGallery',
        type: 'reference', 
        to: [{type: 'imageGallery'}],
        description: 'These should be non character concept art',
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