import {defineField, defineType} from 'sanity'

export const animatedWork = defineType({
  name: 'animatedWork',
  title: 'Animated Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isClientWork',
      type: 'boolean',
      description: 'Is this client work, or fun personal work?',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'link',
        type: 'url',
        description: 'Vimeo or YouTube link to the project',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'website',
        type: 'url',
        description: 'The link to the related project\'s website (usually a client work)',
    }),
    defineField({
        name: 'year',
        type: 'number',
        description: 'Year the project was completed',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'summary',
        type: 'text',
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