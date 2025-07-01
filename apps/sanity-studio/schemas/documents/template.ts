import { defineType, defineField } from 'sanity'

export const templateType = defineType({
  type: 'document',
  name: 'template',
  title: 'Site - Template',
  description: '',
  fields: [
    defineField({name: 'templateName', type: 'string', title: 'Template Name', hidden: false}),
    defineField({name: 'image', type: 'file', title: 'Image', hidden: false}),
    defineField({
      name: 'content',
      type: 'reference',
      title: 'Content',
      hidden: false,
      to: [{type: 'collection'}, {type: 'section'}],
    }),
    defineField({name: 'category', type: 'string', title: 'Category', hidden: false}),
    defineField({
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
  ],
  preview: {select: {title: 'templateName'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})
