import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'

export const heroType = defineType({
  type: 'document',
  name: 'hero',
  title: 'Hero',
  description: 'Hero component for page headers with flexible layout options',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'styling',
      title: 'Styling & Layout',
    },
    {
      name: 'media',
      title: 'Media & Background',
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
      description: 'Choose how the hero content and media should be arranged',
      initialValue: 'Default',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateIn(
            [
              'Default',
              'Media on Left',
              'Media on Left Full Bleed',
              'Media on Right',
              'Media on Right Full Bleed',
              'Media Above',
              'Media Below',
              'Image Only',
            ],
            value,
          ),
        ),
      options: {
        list: [
          {value: 'Default', title: '🎯 Default (Media Right)'},
          {value: 'Media on Left', title: '⬅️ Media on Left'},
          {value: 'Media on Left Full Bleed', title: '⬅️ Media on Left (Full Bleed)'},
          {value: 'Media on Right', title: '➡️ Media on Right'},
          {value: 'Media on Right Full Bleed', title: '➡️ Media on Right (Full Bleed)'},
          {value: 'Media Above', title: '⬆️ Media Above'},
          {value: 'Media Below', title: '⬇️ Media Below'},
          {value: 'Image Only', title: '🖼️ Image Only'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      group: 'content',
      name: 'overline',
      type: 'string',
      title: 'Overline',
      hidden: false,
      description: 'Small text displayed above the main title (e.g., category, date)',
    }),
    defineField({
      group: 'content',
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: false,
      description: 'The main heading of the hero section',
      validation: (Rule) =>
        Rule.max(100).warning('Consider keeping titles concise for better readability'),
    }),
    withAIGeneration(
      defineField({
        group: 'content',
        name: 'subtitle',
        type: 'string',
        title: 'Subtitle',
        hidden: false,
        description: 'Supporting text displayed below the title',
        validation: (Rule) => Rule.max(200).warning('Keep subtitles brief for impact'),
      }),
    ),
    defineField({
      name: 'body',
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
            ],
          },
        },
      ],
      group: 'content',
      title: 'Body',
      hidden: false,
      description: 'Additional content for the hero section. Use sparingly to maintain impact.',
    }),
    defineField({
      group: 'content',
      name: 'actions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'link'}]}],
      title: 'Actions',
      hidden: false,
      description:
        '💡 Add call-to-action buttons or links. Best practice: use 1-2 CTAs for clear user direction.',
      validation: (Rule) => Rule.max(3).warning('More than 2 actions may overwhelm users'),
    }),
    defineField({
      group: 'styling',
      fieldset: 'background',
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      hidden: false,
      description: 'Choose a background color from your design system',
      validation: (Rule) =>
        Rule.custom((value) =>
          validateIn(
            [
              'None',
              'Black',
              'White',
              'Primary',
              'Secondary',
              'Transparent Light',
              'Transparent Dark',
            ],
            value,
          ),
        ),
      options: {
        list: [
          {value: 'None', title: '⚪ None'},
          {value: 'Black', title: '⚫ Black'},
          {value: 'White', title: '⚪ White'},
          {value: 'Primary', title: '🔵 Primary'},
          {value: 'Secondary', title: '🟣 Secondary'},
          {value: 'Transparent Light', title: '💨 Transparent Light'},
          {value: 'Transparent Dark', title: '🌫️ Transparent Dark'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      group: 'media',
      fieldset: 'background',
      name: 'background',
      type: 'reference',
      title: 'Background Image',
      hidden: false,
      description:
        '🖼️ Full-width background image. Use Media items to set different images for desktop/tablet/mobile.',
      to: [{type: 'media'}],
    }),
    defineField({
      group: 'media',
      name: 'sideImageItems',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'media'}]}],
      title: 'Hero Image',
      hidden: false,
      description:
        '📸 Main hero image displayed alongside content (position depends on layout style selected above)',
      validation: (Rule) => Rule.max(1).error('Only one hero image is supported'),
    }),
    defineField({
      type: 'boolean',
      description:
        'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
      name: 'contentfulArchived',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'internalTitle',
      subtitle: 'title',
      variant: 'variant',
      hasImage: 'sideImageItems.0',
      hasBackground: 'background',
      backgroundColor: 'backgroundColor',
    },
    prepare(selection) {
      const {title, subtitle, variant, hasImage, hasBackground, backgroundColor} = selection
      const media = hasImage ? '📸' : hasBackground ? '🖼️' : ''
      const color = backgroundColor && backgroundColor !== 'None' ? ` • ${backgroundColor}` : ''
      return {
        title: title || 'Untitled Hero',
        subtitle: `${variant}${media ? ` • ${media}` : ''}${color}${subtitle ? ` • "${subtitle}"` : ''}`,
      }
    },
  },
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})
