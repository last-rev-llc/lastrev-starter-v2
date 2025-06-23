import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'
import { validateIn } from '../utils/validation'

export const contentful_blockType = defineType({
  type: 'document',
  name: 'contentful_block',
  title: 'Block',
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
      description: 'Configures the placement of elements within the Block.',

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
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'introText',
      type: 'reference',
      title: 'Intro Text',
      hidden: false,
      description:
        '[Optional] Choose a Text item to add a title, subtitle, body, and/or overline that will appear ABOVE the module. Use the Overline, Title, and Body fields below for that text to appear within the module. ',
      to: [{type: 'contentful_text'}],
    }),
    defineField({name: 'overline', type: 'string', title: 'Overline', hidden: false}),
    defineField({name: 'title', type: 'string', title: 'Title', hidden: false}),
    defineField({name: 'subtitle', type: 'string', title: 'Subtitle', hidden: false}),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Heading 5', value: 'h5'},
            {title: 'Heading 6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
          ],
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
        {type: 'break'},
      ],
      title: 'Body',
      hidden: false,
      description: 'This is the main content for the Block.',
    }),
    defineField({
      name: 'actions',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'link'}, {type: 'blog'}, {type: 'page'}, {type: 'person'}]},
      ],
      title: 'Action(s)',
      hidden: false,
      description:
        'Choose a "Link" item to define the CTA. In the Link item you can define different CTA types such as linked text or a button.',
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'asset',
      type: 'file',
      title: 'Quick Media Asset',
      hidden: false,
      description:
        'Choose the primary image for the Block. Note: this will not be shown if there are items in the Contents field.',
    }),
    defineField({
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
    defineField({name: 'backgroundImage', type: 'image', title: 'Background Image', hidden: false}),
    defineField({
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      hidden: false,
      validation: (Rule) =>
        Rule.custom((value) => validateIn(['Transparent', 'Black', 'White', 'Navy'], value)),
      options: {list: ['Transparent', 'Black', 'White', 'Navy'], layout: 'dropdown'},
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
