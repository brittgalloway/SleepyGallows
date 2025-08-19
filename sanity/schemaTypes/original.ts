import {defineField, defineType} from 'sanity'

export const original = defineType({
  name: 'original',
  title: 'Original Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'thumbnail',
        type: 'image',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'link',
        type: 'slug',
        description: 'the slug to this project page',
        validation: (rule) => rule.required(),
    }),
    defineField({
        title: 'Watch',
        name: 'watch',
        type: 'reference', 
        to: [{type: 'animatedWork'}],
        description: 'This is the video or video gallery for the project',
        
    }),
    defineField({
        title: 'Production',
        name: 'production',
        type: 'object',
        fields: [
            {
                title: 'Has a Live Video?',
                name: 'hasLiveVideo',
                type: 'boolean',
                description: 'Does this published, shareable videos?',
            },
            {
                title: 'Watch',
                name: 'watch',
                type: 'reference',
                to: [{type: 'animatedWork'}],
                description: 'This is the video or video gallery for the project',
                hidden: ({ parent }) => parent?.hasLiveVideo != true,
            },
            {
                title: 'Coming Soon',
                name: 'inProduction',
                type: 'reference',
                to: [{type: 'staticImage'}],
                description: 'This is the video or video gallery for the project',
                hidden: ({ parent }) => parent?.hasLiveVideo == true,
            },
        ]
    }),
    defineField({
        title: 'About',
        name: 'about',
        type: 'object',
        fields: [
            {
                name: 'summary',
                type: 'array',
                of: [{type: 'block'}],
                validation: (rule) => rule.required(),
            },
            {
                title: 'Characters',
                name: 'characters',
                type: 'reference', 
                to: [{type: 'imageGallery'}],
                validation: (rule) => rule.required(),
            },
            {
                title: 'Concept Art',
                name: 'conceptArt',
                type: 'array',
                of: [{type: 'imageGallery'}],
            },
        ]
    }),
    defineField({
        name: 'art',
        type: 'reference', 
        to: [{type: 'imageGallery'}],
        description: 'These should be the finished, art, promo art, etc. Will be on a page with little text, mostly the gallery.',
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