import { defineType, defineField } from 'sanity'

export const breakType = defineType({
  name: 'break',
  title: 'Break',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      type: 'string',
      options: {
        list: [
          {title: 'Line break', value: 'lineBreak'},
          {title: 'Read more', value: 'readMore'},
        ],
      },
    }),
  ],
})
