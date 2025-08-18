import {defineField, defineType} from 'sanity'

export const patron = defineType({
  name: 'patron',
  title: 'Patron Page',
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
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})