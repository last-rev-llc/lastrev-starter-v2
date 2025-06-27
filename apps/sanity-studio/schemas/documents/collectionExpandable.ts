import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'

export const collectionExpandableType = defineType({
  type: 'document',
  name: 'collectionExpandable',
  title: 'Collection - Expandable',
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

      initialValue: 'Tabs',
      validation: (Rule) =>
        Rule.required().custom((value) => validateIn(['Tabs', 'Accordion'], value)),
      options: {list: ['Tabs', 'Accordion'], layout: 'dropdown'},
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'collectionExpandableItem'}]}],
      title: 'Expanding Items',
      hidden: false,
      description:
        'Use this field to manually select the items that will appear in this Expanding Collection.',
    }),
    defineField({
      name: 'actions_raw',
      type: 'array',
      of: [
        // Inline link object for expandable collection-specific actions
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
        '💡 Add call-to-action buttons or links. Create expandable collection-specific actions or reference existing reusable links. Best practice: use 1-2 CTAs for clear user direction.',
      validation: (Rule) => Rule.max(3).warning('More than 2 actions may overwhelm users'),
    }),
    defineField({name: 'backgroundImage', type: 'image', title: 'Background Image', hidden: false}),
    defineField({
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      hidden: false,
      validation: (Rule) =>
        Rule.custom((value) => validateIn(['Transparent', 'Black', 'White'], value)),
      options: {list: ['Transparent', 'Black', 'White'], layout: 'dropdown'},
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
