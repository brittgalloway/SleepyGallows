import {defineField, defineType} from 'sanity'

export const storySummary = defineType({
  name: 'storySummary',
  title: 'Story Summary',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'video',
      title: 'YouTube video',
      type: 'object',
      description: 'Optional teaser or commercial for this story.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'url',
          title: 'YouTube URL',
          type: 'url',
          description: 'Optional YouTube link to the project',
        }),
        defineField({
          name: 'title',
          title: 'Video title',
          type: 'string',
          description: 'Read by screen readers, e.g. "Teaser for The Hollow Bell"',
          validation: (Rule) =>
            Rule.custom((title, ctx) => {
              const parent = ctx.parent as { url?: string } | undefined
              return parent?.url && !title ? 'Add a title when a video is set' : true
            }),
        }),
      ]}),
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