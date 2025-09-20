import {defineField, defineType} from 'sanity'

export const textBlock = defineType({
  name: 'textPages',
  title: 'Text Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Large text blocks, like the Patron page, or SG About Page'
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