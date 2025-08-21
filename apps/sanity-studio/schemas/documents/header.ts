import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'
import { backgroundColorOptions, validateBackgroundColor } from '../utils/colors'

export const headerType = defineType({
  type: 'document',
  name: 'header',
  title: 'Site - Header',
  description: '',
  fields: [
    withAIGeneration(
      defineField({name: 'internalTitle', type: 'string', title: 'Internal Title', hidden: false}),
    ),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Layout Style',
      hidden: false,
      description: 'Choose the variant that will be applied to the format of the Header.  ',

      initialValue: 'default',
      validation: (Rule) => Rule.custom((value) => validateIn(['default', 'simplified'], value)),
      options: {list: ['default', 'simplified'], layout: 'dropdown'},
    }),
    defineField({name: 'logo', type: 'file', title: 'Logo', hidden: false}),
    defineField({
      name: 'logoUrl',
      type: 'reference',
      title: 'Logo Url',
      hidden: false,
      to: [{type: 'page'}, {type: 'link'}],
    }),
    defineField({
      name: 'navigationItems',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'navigationItem'}]}],
      title: 'Navigation Items',
      hidden: false,
    }),
    defineField({
      name: 'ctaItems',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'link'}]}],
      title: 'CTA Items',
      hidden: false,
      description: 'Choose one more Link items to add button(s) or linked text items',
    }),
    defineField({name: 'supernavIcon', type: 'image', title: 'Supernav Icon', hidden: false}),
    defineField({
      name: 'supernavText',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
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
          of: [{type: 'reference', title: 'Reference', to: [{type: 'link'}]}],
        },
        {type: 'image'},
        {type: 'file'},
      ],
      title: 'Supernav Text',
      hidden: false,
      description:
        'Optional. The Supernav is a banner that appears above the main navigation. Add the text and optional "Link" for the banner here.',
      validation: (Rule) => Rule.max(250),
    }),
    defineField({
      name: 'supernavMobileText',
      type: 'string',
      title: 'Supernav Mobile Text',
      hidden: false,
    }),
    defineField({
      name: 'supernavLink',
      type: 'reference',
      title: 'Supernav Link',
      hidden: false,
      to: [{type: 'page'}, {type: 'link'}],
    }),
    defineField({
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      hidden: false,

      initialValue: 'Light Background',
      validation: validateBackgroundColor,
      options: {
        list: [
          {value: 'Inherit', title: '↗️ Inherit from Page'},
          ...backgroundColorOptions
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'searchLandingPage',
      type: 'reference',
      title: 'Search Landing Page',
      hidden: false,
      to: [{type: 'page'}],
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
