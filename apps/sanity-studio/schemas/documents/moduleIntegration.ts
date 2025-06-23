import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'

export const moduleIntegrationType = defineType({
  type: 'document',
  name: 'moduleIntegration',
  title: 'Module Integration',
  description: '',
  fields: [
    withAIGeneration(
      defineField({name: 'internalTitle', type: 'string', title: 'Internal Title', hidden: false}),
    ),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Variant',
      hidden: false,
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateIn(['iFrame', 'AnswerAI Chat (Inline)', 'AnswerAI Chat (Page Bubble)'], value),
        ),
      options: {
        list: ['iFrame', 'AnswerAI Chat (Inline)', 'AnswerAI Chat (Page Bubble)'],
        layout: 'dropdown',
      },
    }),
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
      name: 'theme',
      type: 'reference',
      title: 'Theme',
      hidden: true,
      to: [
        {type: 'section'},
        {type: 'card'},
        {type: 'link'},
        {type: 'collection'},
        {type: 'contentful_text'},
        {type: 'page'},
        {type: 'hero'},
        {type: 'navigationItem'},
        {type: 'site'},
        {type: 'header'},
        {type: 'moduleIntegration'},
        {type: 'media'},
        {type: 'person'},
        {type: 'categoryBlog'},
        {type: 'template'},
        {type: 'settings'},
        {type: 'contentful_block'},
        {type: 'footer'},
        {type: 'collectionDynamic'},
        {type: 'elementForm'},
        {type: 'elementVideo'},
        {type: 'collectionExpandableItem'},
        {type: 'collectionExpandable'},
        {type: 'blog'},
        {type: 'siteRedirect'},
      ],
    }),
    defineField({name: 'iFrameUrl', type: 'string', title: 'iFrame URL', hidden: false}),
    defineField({
      name: 'iFrameHeight',
      type: 'string',
      title: 'iFrame Height',
      hidden: false,
      description: 'Enter in a valid CSS value.',
    }),
    defineField({
      name: 'iFrameWidth',
      type: 'string',
      title: 'iFrame Width',
      hidden: false,
      description: 'Enter in a valid CSS value.',
    }),
    defineField({name: 'backgroundImage', type: 'image', title: 'Background Image', hidden: false}),
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
