import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'

export const pageType = defineType({
  type: 'document',
  name: 'page',
  title: 'Page - General',
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
        'This parent page will be used to build the path of the final URL for this page. Choose the page that resides directly above this page in the site hierarchy. If this is a "first-level" page, choose the Homepage. ',
      to: [{type: 'page'}],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      hidden: false,
      description:
        'Enter the path of the url starting from root (ex: /health-101 or health-101/my-article)',
      validation: (Rule) =>
        (Rule.required() as any).regex(/^([^\/][a-zA-Z0-9_\-\/]*[^\/])|(\/)$/, {invert: false}),
      options: {source: 'title'},
    }),
    withAIGeneration(defineField({name: 'title', type: 'string', title: 'Title', hidden: false})),
    defineField({
      name: 'hero',
      type: 'reference',
      title: 'Hero',
      hidden: false,
      description: 'Choose the Hero item that will appear at the top of the page.',
      to: [{type: 'hero'}],
    }),
    defineField({
      name: 'contents',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'collection'},
            {type: 'section'},
            {type: 'contentful_text'},
            {type: 'contentful_block'},
            {type: 'collectionDynamic'},
            {type: 'collectionExpandable'},
            {type: 'media'},
            {type: 'moduleIntegration'},
            {type: 'elementVideo'},
            {type: 'elementForm'},
          ],
        },
      ],
      title: 'Contents',
      hidden: false,
      description:
        'Select the modules that will appear on the page. You can drag and drop them to control the sort order.',
      validation: (Rule) => Rule.required(),
    }),
    withAIGeneration(
      defineField({
        name: 'promoSummary',
        type: 'text',
        title: 'Promo Summary',
        hidden: false,
        description:
          '[Optional] When promoting this page, this summary may be shown dynamically rendered cards, listing pages, etc.)',
      }),
    ),
    defineField({
      name: 'promoImage',
      type: 'image',
      title: 'Promo Image',
      hidden: false,
      description:
        '[Optional] When promoting this page, this image may be shown dynamically rendered cards, listing pages, etc.)',
    }),
    defineField({
      name: 'disableBackToTop',
      type: 'boolean',
      title: 'Disable Back To Top',
      hidden: false,
      description:
        'The \'back to top of page\' widget appears on all pages by default. To disable this for this page, set this condition to "true".',
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
      name: 'categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'categoryBlog'}]}],
      title: 'Categories',
      hidden: false,
    }),
    defineField({
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      hidden: false,
    }),
  ],
  preview: {select: {title: 'internalTitle'}},
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})
