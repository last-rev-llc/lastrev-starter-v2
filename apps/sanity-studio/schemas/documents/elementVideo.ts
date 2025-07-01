import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'

export const elementVideoType = defineType({
  type: 'document',
  name: 'elementVideo',
  title: 'Element - Video',
  description: '',
  fields: [
    withAIGeneration(
      defineField({name: 'internalTitle', type: 'string', title: 'Internal Title', hidden: false}),
    ),
    defineField({name: 'title', type: 'string', title: 'Title', hidden: false}),
    defineField({name: 'altText', type: 'text', title: 'Alt Text', hidden: false}),
    defineField({
      name: 'placeholder',
      type: 'file',
      title: 'Placeholder Image',
      hidden: false,
      description:
        'Use this item to overwrite the default video thumbnail that is associated to the asset URL above.',
    }),
    defineField({
      name: 'assetURL',
      type: 'string',
      title: 'Asset URL',
      hidden: false,
      description: 'Enter the full url for the video here.',
    }),
    defineField({name: 'asset', type: 'file', title: 'Main Asset', hidden: false}),
    defineField({name: 'tablet', type: 'file', title: 'Tablet Asset', hidden: false}),
    defineField({name: 'mobile', type: 'file', title: 'Mobile Asset', hidden: false}),
    defineField({
      name: 'autoplay',
      type: 'boolean',
      title: 'Autoplay?',
      hidden: false,

      initialValue: false,
      validation: (Rule) => Rule.required(),
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
