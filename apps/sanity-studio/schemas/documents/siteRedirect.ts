import { defineType, defineField } from 'sanity'

export const siteRedirectType = defineType({
  type: 'document',
  name: 'siteRedirect',
  title: 'Site - Redirect',
  description: 'Manage site wide redirects',
  fields: [
    defineField({name: 'source', type: 'string', title: 'Source', hidden: false}),
    defineField({name: 'destination', type: 'string', title: 'Destination', hidden: false}),
    defineField({name: 'permanent', type: 'boolean', title: 'Permanent', hidden: false}),
    defineField({
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
  ],
  preview: {select: {title: 'source'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})
