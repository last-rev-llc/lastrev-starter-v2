import { defineType, defineField } from 'sanity'

export const cardType = defineType({
  type: 'object',
  name: 'card',
  title: 'Collection Item',
  description: '',
  fields: [
    // defineField({name: 'internalTitle', type: 'string', title: 'Internal Title', hidden: false}),

    // defineField({
    //   name: 'overline',
    //   type: 'string',
    //   title: 'Overline',
    //   hidden: false,
    //   description: '[Optional] This field will be displayed above the Title.',
    //   validation: (Rule) => Rule.max(256),
    // }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: false,
      description: 'Title on the card',
    }),

    // defineField({
    //   name: 'subtitle',
    //   type: 'string',
    //   title: 'Subtitle',
    //   hidden: false,
    //   description: '[Optional] This field will be displayed below the Title.',
    // }),
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
      title: 'Body',
      hidden: false,
    }),
    defineField({
      name: 'actions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'link'}]}],
      title: 'Actions',
      hidden: false,
      description:
        'The Actions field is used when only the Link item (linked text or button) of the card is intended to be clickable (not the card itself).',
    }),
    defineField({
      name: 'media',
      type: 'array',
      of: [{type: 'image'}, {type: 'file'}],
      title: 'Media',
      hidden: false,
    }),
    defineField({
      name: 'link',
      type: 'reference',
      title: 'Link',
      hidden: false,
      description:
        'The Link field is used when the entire area of the card is intended to be clickable. Select the Link item to configure the location and attributes of the link.',
      to: [{type: 'link'}],
    }),
    // defineField({
    //   name: 'disclaimer',
    //   type: 'string',
    //   title: 'Disclaimer',
    //   hidden: false,
    //   description: 'This field will be used for only pricing and Author variant',
    // }),
    // defineField({
    //   name: 'userName',
    //   type: 'string',
    //   title: 'User Name',
    //   hidden: false,
    //   description: 'Only for Testimonial variant',
    // }),
    // defineField({
    //   type: 'boolean',
    //   description:
    //     'If this document was archived on Contentful at the time of export, the document will be in a read-only state.',
    //   name: 'contentfulArchived',
    //   readOnly: true,
    // }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'body',
      media: 'media',
      hasActions: 'actions',
      linkTitle: 'link.title',
    },
    prepare(selection) {
      const {title, subtitle, media, hasActions, linkTitle} = selection

      // Extract text from rich text body if available
      const bodyText =
        subtitle && subtitle.length > 0
          ? subtitle
              .filter((block: any) => block._type === 'block')
              .map((block: any) =>
                (block as any).children?.filter((child: any) => child._type === 'span')
                  ?.map((span: any) => span.text)
                  ?.join(''),
              )
              .join(' ')
              .slice(0, 100) + (subtitle.length > 100 ? '...' : '')
          : ''

      // Build subtitle with available information
      const subtitleParts = []
      if (bodyText) subtitleParts.push(bodyText)
      if (hasActions && hasActions.length > 0)
        subtitleParts.push(`• ${hasActions.length} action${hasActions.length > 1 ? 's' : ''}`)
      if (linkTitle) subtitleParts.push(`• Links to: ${linkTitle}`)

      return {
        title: title || 'Untitled Card',
        subtitle: subtitleParts.join(' '),
        media: media && media.length > 0 ? media[0] : undefined,
      }
    },
  },
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})
