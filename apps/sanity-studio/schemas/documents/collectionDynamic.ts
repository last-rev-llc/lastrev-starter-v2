import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'

export const collectionDynamicType = defineType({
  type: 'document',
  name: 'collectionDynamic',
  title: 'Collection - Dynamic',
  description: '',
  fields: [
    withAIGeneration(
      defineField({name: 'internalTitle', type: 'string', title: 'Internal Title', hidden: false}),
    ),
    defineField({
      name: 'introText',
      type: 'reference',
      title: 'Intro Text',
      hidden: false,
      description:
        '[Optional] Choose a Text item to add a title, subtitle, body, and/or overline to this module.',
      to: [{type: 'contentful_text'}],
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Layout Style',
      hidden: false,
      description:
        'The "variant" of the Collection often refers the appearance and/or functionality of the Collection as a whole.',

      initialValue: 'Three Per Row',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateIn(
            ['One Per Row', 'Two Per Row', 'Three Per Row', 'Four Per Row', 'Five Per Row'],
            value,
          ),
        ),
      options: {
        list: ['One Per Row', 'Two Per Row', 'Three Per Row', 'Four Per Row', 'Five Per Row'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'itemsVariant',
      type: 'string',
      title: 'Items Style',
      hidden: false,
      description:
        'Determines the appearance of each individual item in the collection and most often refers to the appearance of a Card item.',

      initialValue: 'Default',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateIn(
            [
              'Default',
              'Icon',
              'Logo',
              'Media',
              'Media Only Full',
              'Media Only Fit',
              'Pricing',
              'Person',
              'Quote',
              'Blog',
              'Link List',
              'Hover',
              'Icon - left',
              'News',
              'Search',
            ],
            value,
          ),
        ),
      options: {
        list: [
          'Default',
          'Icon',
          'Logo',
          'Media',
          'Media Only Full',
          'Media Only Fit',
          'Pricing',
          'Person',
          'Quote',
          'Blog',
          'Link List',
          'Hover',
          'Icon - left',
          'News',
          'Search',
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'itemsAspectRatio',
      type: 'string',
      title: 'Items Aspect Ratio',
      hidden: false,
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateIn(['Default', 'Horizontal', 'Vertical', 'Square'], value),
        ),
      options: {list: ['Default', 'Horizontal', 'Vertical', 'Square'], layout: 'dropdown'},
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'card'}, {type: 'person'}]}],
      title: 'Manual Items',
      hidden: false,
      description:
        'Use this field to manually select the items that will appear in this Collection.',
    }),
    defineField({
      name: 'filtersPlacement',
      type: 'string',
      title: 'Filters Placement',
      hidden: false,
      validation: (Rule) => Rule.custom((value) => validateIn(['Top', 'Left'], value)),
      options: {list: ['Top', 'Left'], layout: 'dropdown'},
    }),
    defineField({
      name: 'pullFromContentType',
      type: 'string',
      title: 'Pull from Content Type',
      hidden: true,
      description:
        'Choose the content type that will appear in the cards.  If you need to use a mix of different content types, please use the manual "Items" reference field.',
      validation: (Rule) => Rule.custom((value) => validateIn(['Blog'], value)),
      options: {list: ['Blog'], layout: 'dropdown'},
    }),
    defineField({
      name: 'pullFromCategoryItems',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'categoryBlog'}]}],
      title: 'Pull from Category Items',
      hidden: true,
      description:
        'Choose the category to automatically pull the most recent published items related to this category.',
    }),
    defineField({
      name: 'numberOfItemsToPull',
      type: 'string',
      title: 'Number of items to pull',
      hidden: true,
      description:
        'Add a numerical value for the number of items to automatically pull from a category. ',
    }),
    defineField({
      name: 'actions_raw',
      type: 'array',
      of: [
        // Inline link object for dynamic collection-specific actions
        {type: 'link'},
        // Reference existing link for reusable CTAs
        {
          type: 'reference',
          title: 'Existing Link',
          to: [{type: 'link'}],
        },
      ],
      title: 'Actions',
      hidden: false,
      description:
        '💡 Add call-to-action buttons or links. Create dynamic collection-specific actions or reference existing reusable links. Best practice: use 1-2 CTAs for clear user direction.',
      validation: (Rule) => Rule.max(3).warning('More than 2 actions may overwhelm users'),
    }),
    defineField({
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      hidden: false,
      validation: (Rule) =>
        Rule.custom((value) => validateIn(['Transparent', 'Black', 'White', 'Navy'], value)),
      options: {list: ['Transparent', 'Black', 'White', 'Navy'], layout: 'dropdown'},
    }),
    defineField({
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
  ],
  preview: {select: {title: 'internalTitle'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})
