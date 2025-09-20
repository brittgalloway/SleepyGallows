import {defineField, defineType} from 'sanity'

export const animatedWork = defineType({
  name: 'animatedWork',
  title: 'Animated Work',
  type: 'document',
  fields: [
    defineField({
      title: 'Header',
      name: 'Header',
      type: 'string',
      description: 'title for the page, ex: Client Work, For Fun, etc',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Animation Gallery',
      name: 'animation',
      type: 'array',
      of: [{type: 'object',
        fields: [
          {
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
          },
          {
            name: 'link',
            type: 'url',
            description: 'Vimeo or YouTube link to the project',
            validation: (rule) => rule.required(),
          },
          {
            name: 'website',
            type: 'url',
            description: 'The link to the related project\'s website (usually a client work)',
          },
          {
            name: 'year',
            type: 'number',
            description: 'Year the project was completed',
            validation: (rule) => rule.required(),
          },
          {
            name: 'summary',
            type: 'text',
          },
        ]
      }]
    }),
    defineField({
      title: 'Rive File',
      name: 'rive',
      type: 'file',
      description: 'This is the riv file, probably for the webdev header',
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