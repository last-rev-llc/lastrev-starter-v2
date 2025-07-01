import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'

export const elementFormType = defineType({
  type: 'document',
  name: 'elementForm',
  title: 'Element - Form',
  description: '',
  fields: [
    withAIGeneration(
      defineField({name: 'internalTitle', type: 'string', title: 'Internal Title', hidden: false}),
    ),
    defineField({
      name: 'parentPage',
      type: 'reference',
      title: 'Parent Page',
      hidden: false,
      description:
        '[Optional] Use this to define the parent path for the form url (aka form slug and confirmation path). ',
      to: [{type: 'page'}],
    }),
    defineField({
      name: 'slug',
      type: 'string',
      title: 'Slug',
      hidden: false,
      description:
        '[Optional] This is used to define the path if you want to provide a URL that has only a form and no other elements. However, the primary purpose is to define the confirmation page parent path.',
      validation: (Rule) => Rule.regex(/^([^\/][a-zA-Z0-9_\-\/]*[^\/])|(\/)$/, {invert: false}),
    }),
    defineField({
      name: 'introText',
      type: 'reference',
      title: 'Intro Text',
      hidden: false,
      to: [{type: 'contentful_text'}],
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Variant',
      hidden: false,

      initialValue: 'Default',
      validation: (Rule) => Rule.required().custom((value) => validateIn(['Default'], value)),
      options: {list: ['Default'], layout: 'dropdown'},
    }),
    defineField({
      name: 'hubspotPortalId',
      type: 'string',
      title: 'Hubspot Portal ID',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hubspotFormId',
      type: 'string',
      title: 'Hubspot Form ID',
      hidden: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'confirmationPath',
      type: 'string',
      title: 'Successful Confirmation URL Path',
      hidden: false,
      description:
        '[Optional] This is used to display a confirmation page that may contain an asset to download or to watch. This will be added to the end of the form url (slug) for the confirmation url (e.g. /[form-slug]/confirmation)',
    }),
    defineField({
      name: 'submissionContentItems',
      type: 'array',
      of: [
        {
          type: 'reference',
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
        },
      ],
      title: 'Submission Content Items',
      hidden: false,
      description:
        '[Optional] The content here will render after a successful form submission. Use this field to provide a Text item success message, a Block with a CTA for downloading content or an Video embed to watch.',
    }),
    defineField({
      name: 'headerOverride',
      type: 'reference',
      title: 'Header Override',
      hidden: false,
      to: [{type: 'header'}],
    }),
    defineField({
      name: 'footerOverride',
      type: 'reference',
      title: 'Footer Override',
      hidden: false,
      to: [{type: 'footer'}],
    }),
    defineField({
      name: 'footerDisclaimerOverride',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                type: 'object',
                name: 'link',
                title: 'url',
                fields: [
                  defineField({
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                    type: 'string',
                    name: 'target',
                    title: 'Target',
                    options: {
                      list: [
                        {value: '_blank', title: 'Blank'},
                        {value: '_parent', title: 'Parent'},
                      ],
                    },
                  }),
                ],
              },
              {
                type: 'reference',
                name: 'reference',
                title: 'Reference',
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
              },
              {type: 'image'},
              {type: 'file'},
            ],
          },
        },
      ],
      title: 'Footer Disclaimer Override',
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
