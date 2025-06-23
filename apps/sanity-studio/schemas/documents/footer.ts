import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'

export const footerType = defineType({
  type: 'document',
  name: 'footer',
  title: 'Site - Footer',
  description: '',
  fields: [
    withAIGeneration(
      defineField({name: 'internalTitle', type: 'string', title: 'Internal Title', hidden: false}),
    ),
    defineField({
      name: 'introContents',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'contentful_block'},
            {type: 'collection'},
            {type: 'collectionExpandable'},
            {type: 'elementForm'},
          ],
        },
      ],
      title: 'Intro Contents',
      hidden: false,
    }),
    defineField({name: 'logo', type: 'file', title: 'Logo', hidden: false}),
    defineField({
      name: 'logoUrl',
      type: 'reference',
      title: 'Logo Url',
      hidden: false,
      to: [{type: 'link'}, {type: 'page'}],
    }),
    defineField({
      name: 'navigationItems',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'navigationItem'}]}],
      title: 'Navigation Items',
      hidden: false,
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'link'}]}],
      title: 'Social Links',
      hidden: false,
    }),
    defineField({
      name: 'disclaimerText',
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
      title: 'Disclaimer Text',
      hidden: false,
    }),
    defineField({
      name: 'copyrightDisclaimer',
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
      title: 'Copyright Disclaimer',
      hidden: false,
    }),
    defineField({
      name: 'legalLinks',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'link'}, {type: 'page'}]}],
      title: 'Legal Links',
      hidden: false,
    }),
    defineField({
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      hidden: false,

      initialValue: 'Inherit',
      validation: (Rule) =>
        Rule.required().custom((value) => validateIn(['Inherit', 'Black', 'White'], value)),
      options: {list: ['Inherit', 'Black', 'White'], layout: 'dropdown'},
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
