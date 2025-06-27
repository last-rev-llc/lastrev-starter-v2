import {defineType, defineField} from 'sanity'
import {withAIGeneration} from '../utils/ai-generation'
import {validateIn} from '../utils/validation'
import {backgroundColorOptions, validateBackgroundColor} from '../utils/colors'

export const contentful_blockType = defineType({
  type: 'document',
  name: 'contentful_block',
  title: 'Block',
  description: 'Flexible content block with media and text layout options',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'media',
      title: 'Media & Assets',
    },
    {
      name: 'styling',
      title: 'Styling & Layout',
    },
  ],
  fieldsets: [
    {
      name: 'background',
      title: 'Background Settings',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    withAIGeneration(
      defineField({
        group: 'content',
        name: 'internalTitle',
        type: 'string',
        title: 'Internal Title',
        hidden: false,
        validation: (Rule) =>
          Rule.required()
            .min(1)
            .max(100)
            .error('Internal title is required and must be under 100 characters'),
      }),
    ),
    defineField({
      group: 'styling',
      name: 'variant',
      type: 'string',
      title: 'Layout Style',
      hidden: false,
      description: 'Choose how the block content and media should be arranged',

      initialValue: 'Default',
      validation: (Rule) =>
        Rule.custom((value) =>
          validateIn(
            [
              'Default',
              'Content on Right',
              'Content on Right Full Bleed',
              'Content on Left',
              'Content on Left Full Bleed',
              'Content Above',
              'Content Below',
              'Small Content on Left',
              'Small Content on Right',
              'No Content',
            ],
            value,
          ),
        ),
      options: {
        list: [
          {value: 'Default', title: '🎯 Default'},
          {value: 'Content on Right', title: '➡️ Content on Right'},
          {value: 'Content on Right Full Bleed', title: '➡️ Content on Right (Full Bleed)'},
          {value: 'Content on Left', title: '⬅️ Content on Left'},
          {value: 'Content on Left Full Bleed', title: '⬅️ Content on Left (Full Bleed)'},
          {value: 'Content Above', title: '⬆️ Content Above'},
          {value: 'Content Below', title: '⬇️ Content Below'},
          {value: 'Small Content on Left', title: '⬅️ Small Content on Left'},
          {value: 'Small Content on Right', title: '➡️ Small Content on Right'},
          {value: 'No Content', title: '🚫 No Content (Media Only)'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      group: 'content',
      name: 'introText_raw',
      type: 'introText',
      title: 'Intro Text',
      description: 'Add intro content to appear above the block content',
    }),
    defineField({
      group: 'content',
      name: 'actions_raw',
      type: 'array',
      of: [
        // Inline link object for block-specific actions
        {type: 'link'},
        // Reference existing link for reusable CTAs
        {
          type: 'reference',
          title: 'Existing Link',
          to: [{type: 'link'}],
        },
      ],
      title: 'Actions',
      hidden: false,
      description:
        '💡 Add call-to-action buttons or links. Create block-specific actions or reference existing reusable links. Best practice: use 1-2 CTAs for clear user direction.',
      validation: (Rule) => Rule.max(3).warning('More than 2 actions may overwhelm users'),
    }),
    defineField({
      group: 'media',
      name: 'asset',
      type: 'file',
      title: 'Quick Media Asset',
      hidden: false,
      description:
        'Choose the primary image for the Block. Note: this will not be shown if there are items in the Contents field.',
    }),
    defineField({
      group: 'media',
      name: 'supplementalContent',
      type: 'reference',
      title: 'Supplemental Content',
      hidden: false,
      to: [
        {type: 'link'},
        {type: 'media'},
        {type: 'moduleIntegration'},
        {type: 'contentful_text'},
        {type: 'elementForm'},
      ],
    }),
    defineField({
      group: 'styling',
      fieldset: 'background',
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      hidden: false,
      description: 'Optional background image for the block',
    }),
    defineField({
      group: 'styling',
      fieldset: 'background',
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      hidden: false,
      description:
        'Select the background color for this Block from the options defined in your design system',
      initialValue: 'Light Primary-1',
      validation: validateBackgroundColor,
      options: {
        list: backgroundColorOptions,
        layout: 'dropdown',
      },
    }),
    defineField({
      group: 'styling',
      fieldset: 'background',
      name: 'insetPadding',
      type: 'boolean',
      title: 'Inset Padding',
      description: 'Add extra padding to create an inset effect for the background',
      initialValue: false,
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
