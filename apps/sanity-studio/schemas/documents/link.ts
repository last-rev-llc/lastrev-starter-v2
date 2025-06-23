import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'

export const linkType = defineType({
  type: 'document',
  name: 'link',
  title: 'Link - CTA',
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
      description: 'Choose the format of your linked item.',

      initialValue: 'Link',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateIn(['Link', 'Button - Text', 'Button - Outlined', 'Button - Contained'], value),
        ),
      options: {
        list: ['Link', 'Button - Text', 'Button - Outlined', 'Button - Contained'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'linkedContent',
      type: 'reference',
      title: 'Linked Content',
      hidden: false,
      description:
        'If the page or the link exists in Contentful, use this field to select the slug or URL of that item.',
      to: [{type: 'page'}],
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
      name: 'text',
      type: 'string',
      title: 'Link Text',
      hidden: false,
      description:
        'This text will appear within the link or button. For links that utilize only an icon (and no link text), this text will be used for accessibility purposes.',
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      hidden: false,
      description: 'For icon-only buttons, leave text field empty',
      validation: (Rule) =>
        Rule.custom((value) =>
          validateIn(
            [
              'instagram',
              'facebook',
              'twitter',
              'youtube',
              'chevron-right',
              'caret-right',
              'logo',
              'linkedin',
            ],
            value,
          ),
        ),
      options: {
        list: [
          'instagram',
          'facebook',
          'twitter',
          'youtube',
          'chevron-right',
          'caret-right',
          'logo',
          'linkedin',
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'iconPosition',
      type: 'string',
      title: 'Icon Position',
      hidden: false,
      description:
        'Optional. This applies only to Links with an icon.  Icon positioned on the right side of the text by default',

      initialValue: 'Right',
      validation: (Rule) => Rule.custom((value) => validateIn(['Right', 'Left', 'None'], value)),
      options: {list: ['Right', 'Left', 'None'], layout: 'dropdown'},
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color',
      hidden: false,
      description: 'Choose the button or link color within your design system.',
      validation: (Rule) =>
        Rule.custom((value) =>
          validateIn(['primary', 'secondary', 'info', 'success', 'error'], value),
        ),
      options: {list: ['primary', 'secondary', 'info', 'success', 'error'], layout: 'dropdown'},
    }),
    defineField({
      name: 'target',
      type: 'string',
      title: 'Target',
      hidden: false,

      initialValue: 'Default',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateIn(['Default', 'New Window', 'Same Window', 'Parent Window'], value),
        ),
      options: {
        list: ['Default', 'New Window', 'Same Window', 'Parent Window'],
        layout: 'dropdown',
      },
    }),
    defineField({name: 'altText', type: 'text', title: 'Alt Text', hidden: false}),
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
