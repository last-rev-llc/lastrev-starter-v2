import {defineType, defineField} from 'sanity'
import {withAIGeneration} from '../utils/ai-generation'
import {validateIn} from '../utils/validation'
import {backgroundColorOptions, colorField, validateBackgroundColor} from '../utils/colors'

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
      name: 'actions_raw',
      type: 'array',
      of: [
        // Inline link object for hero-specific actions
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
        '💡 Add call-to-action buttons or links. Create hero-specific actions or reference existing reusable links. Best practice: use 1-2 CTAs for clear user direction.',
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
      validation: validateBackgroundColor,
      options: {
        list: backgroundColorOptions,
        layout: 'dropdown',
      },
    }),
    defineField({
      group: 'media',
      fieldset: 'background',
      name: 'background',
      type: 'array',
      of: [
        // Reference to media document for responsive images
        {
          type: 'reference',
          title: 'Media Reference',
          to: [{type: 'media'}],
          description: 'Use Media items for responsive images with desktop/tablet/mobile variants',
        },
        // Direct image upload for simple cases
        {
          type: 'image',
          title: 'Direct Image',
          fields: [
            defineField({
              name: 'altText',
              type: 'string',
              title: 'Alt Text',
              description: 'Required for ADA compliance - describe the image for screen readers',
              validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
            }),
          ],
        },
        // File upload for PDFs or other documents
        {
          type: 'file',
          title: 'Background Document',
          description: 'For special cases like animated backgrounds or PDFs',
          fields: [
            defineField({
              name: 'description',
              type: 'string',
              title: 'File Description',
              description: 'Required for ADA compliance - describe the file content',
              validation: (Rule) =>
                Rule.required().error('Description is required for accessibility'),
            }),
          ],
        },
      ],
      title: 'Background Media',
      hidden: false,
      description:
        '🖼️ Full-width background. Use Media reference for responsive images, direct upload for simple images, or file upload for special formats.',
      validation: (Rule) => Rule.max(1).error('Only one background item is allowed'),
    }),
    defineField({
      group: 'media',
      name: 'sideImageItems',
      type: 'array',
      of: [
        // Reference to media document for responsive images/videos
        {
          type: 'reference',
          title: 'Media Reference',
          to: [{type: 'media'}],
          description:
            'Use Media items for responsive images/videos with desktop/tablet/mobile variants',
        },
        // Direct image upload for simple cases
        {
          type: 'image',
          title: 'Direct Image',
          fields: [
            defineField({
              name: 'altText',
              type: 'string',
              title: 'Alt Text',
              description: 'Required for ADA compliance - describe the image for screen readers',
              validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
            }),
          ],
        },
        // Inline video element
        {
          type: 'object',
          name: 'inlineVideo',
          title: 'Inline Video',
          fields: [
            defineField({
              name: 'url',
              type: 'url',
              title: 'Video URL',
              description: 'YouTube, Vimeo, or direct video URL',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'thumbnail',
              type: 'image',
              title: 'Video Thumbnail',
              description: 'Custom thumbnail for the video',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Video Caption',
              description: 'Required for ADA compliance - describe the video content',
              validation: (Rule) => Rule.required().error('Caption is required for accessibility'),
            }),
            defineField({
              name: 'autoplay',
              type: 'boolean',
              title: 'Autoplay',
              initialValue: false,
            }),
          ],
        },
      ],
      title: 'Hero Media',
      hidden: false,
      description:
        '📸 Main hero media displayed alongside content. Position depends on layout style. Supports responsive images, videos, and direct uploads.',
      validation: (Rule) => Rule.max(1).error('Only one hero media item is supported'),
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
      hasBackground: 'background.0',
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
