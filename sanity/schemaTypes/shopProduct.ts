import {defineField, defineType} from 'sanity'

export const shopProduct = defineType({
  name: 'shopProduct',
  title: 'Shop Product',
  type: 'document',
  fields: [
    defineField({
        name: 'productName',
        type: 'string',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'productSlug',
        type: 'slug',
        options: {source: 'title'},
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'productType',
        type: 'string',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'price',
        type: 'number',
        description: 'Full price for the product',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'discountedPrice',
        type: 'number',
        description: 'Discounted price for the product',
    }),
    defineField({
        name: 'stock',
        type: 'number',
        description: 'No negative numbers',
        validation: (rule) => rule.required(),
    }),
    defineField({
        title: 'Product Display',
        name: 'productDisplay',
        type: 'array',
        of: [{type: 'imageGallery'}],
        description: 'Max of 4 images',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'shortDescription',
        type: 'text',
        description: 'Used in the stripe checkout and invoice',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'detailedDescription',
        type: 'array',
        of: [{type: 'block'}],
        description: 'Used on the product page',
        validation: (rule) => rule.required(),
    }),
    defineField({
        title: 'Is this shippable?',
        name: 'shippable',
        type: 'boolean',
        description: 'Physical items need to be shipped, digital products do not',
        
    }),
    defineField({
        name: 'originalsSummary',
        type: 'array',
        of: [{type: 'storySummary'}],
        description: 'This is a short summary to add under the product details. To tell new shoppers what the product is related to.',
    }),
    ],
})