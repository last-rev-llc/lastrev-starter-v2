import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'
import { backgroundColorOptions, validateBackgroundColor } from '../utils/colors'

export const sectionType = defineType({
  type: 'document',
  name: 'section',
  title: 'Section',
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
      description:
        'Choose the variant that will be applied to the format of the Section and/or applied to the items selected in the Content field.',

      initialValue: 'Default',
      validation: (Rule) =>
        Rule.custom((value) => validateIn(['Default', 'One Per Row', 'Two Per Row'], value)),
      options: {list: ['Default', 'One Per Row', 'Two Per Row'], layout: 'dropdown'},
    }),
    defineField({
      name: 'anchorName',
      type: 'string',
      title: 'Anchor name',
      hidden: false,
      description:
        'Optional. Use this field to define the name of an anchor placement for this section.',
    }),
    defineField({
      name: 'introText',
      type: 'reference',
      title: 'Intro Text',
      hidden: false,
      description:
        '[Optional] Choose a Text item to add a title, subtitle, body, and/or overline to this module.',
      to: [{type: 'contentful_text'}],
    }),
    defineField({
      name: 'contents',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'contentful_block'},
            {type: 'collection'},
            {type: 'media'},
            {type: 'elementForm'},
            {type: 'collectionDynamic'},
            {type: 'collectionExpandable'},
            {type: 'contentful_text'},
            {type: 'elementVideo'},
          ],
        },
      ],
      title: 'Contents',
      hidden: false,
      description: 'Choose the items that will appear in this section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'background',
      type: 'reference',
      title: 'Background Media',
      hidden: false,
      description:
        'Optional. Use a Media item to define an image used in the background of the Section.',
      to: [{type: 'media'}],
    }),
    defineField({
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      hidden: false,
      description:
        'Select the background color for this Section from the options defined in your design system or brand color scheme.',
      initialValue: 'Light Background',
      validation: validateBackgroundColor,
      options: {
        list: backgroundColorOptions,
        layout: 'dropdown',
      },
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
