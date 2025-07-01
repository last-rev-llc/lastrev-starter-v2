import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'

export const mediaType = defineType({
  type: 'document',
  name: 'media',
  title: 'Element - Media',
  description: '',
  fields: [
    withAIGeneration(
      defineField({name: 'internalTitle', type: 'string', title: 'Internal Title', hidden: false}),
    ),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Asset Type',
      hidden: false,
      description: 'Please select Image or Video from the dropdown.',
      validation: (Rule) =>
        Rule.required().custom((value) => validateIn(['Image', 'Video'], value)),
      options: {list: ['Image', 'Video'], layout: 'dropdown'},
    }),
    defineField({name: 'title', type: 'string', title: 'Title', hidden: false}),
    defineField({
      name: 'asset',
      type: 'image',
      title: 'Main Asset',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'tablet', type: 'image', title: 'Tablet Asset', hidden: false}),
    defineField({name: 'mobile', type: 'image', title: 'Mobile Asset', hidden: false}),
    defineField({
      name: 'assetUrl',
      type: 'string',
      title: 'External Video URL',
      hidden: false,
      description: 'This is only used for video',
    }),
    defineField({
      name: 'placeholder',
      type: 'image',
      title: 'Placeholder Image',
      hidden: false,
      description:
        'Use this item to overwrite the default video thumbnail that is associated to the asset URL above.',
    }),
    defineField({
      name: 'autoplay',
      type: 'boolean',
      title: 'Autoplay?',
      hidden: false,

      initialValue: false,
    }),
    defineField({name: 'altText', type: 'text', title: 'Alt Text', hidden: false}),
    defineField({
      name: 'link',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'link'}]}],
      title: 'Link',
      hidden: false,
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
