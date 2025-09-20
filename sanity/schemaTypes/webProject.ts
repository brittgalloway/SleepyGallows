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
        options: {
            list: [
                { title: "Design", value: "Design" },
                { title: "Development", value: "Development" },
                { title: "Development & Design", value: "Development & Design" },
            ],
        },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tools',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'liveApp',
        type: 'string',
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