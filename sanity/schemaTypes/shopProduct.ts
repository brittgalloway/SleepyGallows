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
        options: {
            list: [
                { title: "fine art", value: "fine-art" },
                { title: "prints", value: "prints" },
                { title: "books", value: "books" },
                { title: "accessories", value: "accessories" },
            ],
        },
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
        type: 'reference', 
        to: [{type: 'imageGallery'}],
        description: 'Max of 4 images, webp. Sizes: 855px x 450px or 430px X 500px',
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
        title: 'Shipping',
        name: 'shipping',
        type: 'object',
        fields: [
            {
                title: 'Is this shippable?',
                name: 'shippable',
                type: 'boolean',
                description: 'Physical items need to be shipped, digital products do not',
            },
            {
                title: 'Shipping Options',
                name: 'shippingOptions',
                type: 'string',
                options: {
                    list: [
                        { title: "Print Domestic", value: "print domestic" },
                        { title: "Wood Panel", value: "wood panel" },
                        { title: "Mat Board", value: "mat board" },
                        { title: "Stickers", value: "stickers" },
                        { title: "Books", value: "books" },
                    ],
                },
                hidden: ({ parent }) => parent?.shippable != true,
            },
        ]
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'originalsSummary',
        type: 'reference',
        to: [{type: 'storySummary'}],
        description: 'This is a short summary to add under the product details. To tell new shoppers what the product is related to.',
    }),
    ],
})