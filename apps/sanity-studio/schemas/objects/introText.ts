import { defineType, defineField } from 'sanity'

export const introTextType = defineType({
  type: 'object',
  name: 'introText',
  title: 'Intro Text',
  description: 'Add intro content to appear above the main content of this module.',
  fieldsets: [{name: 'styling', title: 'Styling'}],
  // Simplified - no nested fieldsets within the object
  options: {
    collapsible: true,
    collapsed: false, // Start expanded for easier access
  },

  fields: [
    defineField({
      name: 'overline',
      type: 'string',
      title: 'Overline',
      description: 'Small text that appears above the title (optional)',
      placeholder: 'e.g., "Featured" or "Latest News"',
      validation: (Rule) => Rule.max(50).warning('Keep overlines short for better readability'),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Main heading for this intro section',
      placeholder: 'Enter a compelling title...',
      validation: (Rule) => Rule.max(100).warning('Titles over 100 characters may be truncated'),
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body Content',
      description: 'Rich text content for the intro section (optional)',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
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
                title: 'Link',
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
                        {value: '_blank', title: 'New window'},
                        {value: '_parent', title: 'Same window'},
                      ],
                    },
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),
    // Simplified styling options - only the most commonly used
    defineField({
      name: 'align',
      type: 'string',
      fieldset: 'styling',
      title: 'Text Alignment',
      description: 'Choose alignment of the text',
      initialValue: 'Default',
      options: {
        list: [
          {title: 'Default', value: 'Default'},
          {title: 'Left', value: 'Left'},
          {title: 'Center', value: 'Center'},
          {title: 'Right', value: 'Right'},
        ],
        layout: 'radio', // Radio buttons for simpler UI
      },
    }),
  ],

  // Simplified preview
  preview: {
    select: {
      title: 'title',
      subtitle: 'overline',
    },
    prepare({title, subtitle}) {
      return {
        title: title || subtitle || 'Intro Text',
        subtitle: subtitle && title ? subtitle : title ? 'Has title' : 'Empty',
      }
    },
  },
})
