import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'

export const navigationItemType = defineType({
  type: 'document',
  name: 'navigationItem',
  title: 'Link - Navigation',
  description: '',
  fields: [
    withAIGeneration(
      defineField({name: 'internalTitle', type: 'string', title: 'Internal Title', hidden: false}),
    ),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Link Style',
      hidden: false,

      initialValue: 'link',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateIn(
            [
              'Link',
              'Link - Bolded',
              'Group',
              'Label',
              'Locale List',
              'Button - Outlined',
              'Button - Contained',
              'Featured',
            ],
            value,
          ),
        ),
      options: {
        list: [
          'Link',
          'Link - Bolded',
          'Group',
          'Label',
          'Locale List',
          'Button - Outlined',
          'Button - Contained',
          'Featured',
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'text',
      type: 'string',
      title: 'Link Text',
      hidden: false,
      description:
        'This text will appear within the link or button. For links that utilize only an icon (and no link text), this text will be used for accessibility purposes..',
    }),
    defineField({
      name: 'linkedContent',
      type: 'reference',
      title: 'Linked Content',
      hidden: false,
      description:
        'If the page or the link exists in Contentful, use this field to select the slug or URL of that item.',
      to: [{type: 'page'}, {type: 'person'}, {type: 'blog'}],
    }),
    defineField({
      name: 'manualUrl',
      type: 'string',
      title: 'Manual URL',
      hidden: false,
      description:
        'If the page or URL does not exist in Contentful, use this field to manually configure an absolute URL. NOTE: if this field is used, the Linked Content field will be ignored.',
    }),
    defineField({
      name: 'summary',
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
      title: 'Summary',
      hidden: false,
      description:
        'Will show below the link.   If the variant is "featured" then this will take up the entire column.',
    }),
    defineField({name: 'navMedia', type: 'file', title: 'Media', hidden: false}),
    defineField({name: 'altText', type: 'text', title: 'Alt Text', hidden: false}),
    defineField({
      name: 'subNavigation',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'link'}, {type: 'navigationItem'}]}],
      title: 'Sub Navigation',
      hidden: false,
      description:
        'To create navigation menus with hierarchies, you can select child "Link - Navigation" items here.',
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
