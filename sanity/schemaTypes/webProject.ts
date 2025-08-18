import {defineField, defineType} from 'sanity'

export const webProject = defineType({
  name: 'webProject',
  title: 'Web Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'icon',
        type: 'image',
    }),
    defineField({
      name: 'tools',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'liveApp',
        type: 'url',
        description: 'Link to the live application',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'github',
        type: 'url',
        description: 'Link to the GitHub repository',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'description',
        type: 'text',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})