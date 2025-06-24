import { defineType, defineField } from 'sanity'
import { validateIn } from '../utils/validation'
import { backgroundColorOptions, validateBackgroundColor } from '../utils/colors'

export const collectionType = defineType({
  type: 'document',
  name: 'collection',
  title: 'Collection',
  description: 'A collection of content items that can be displayed in various layouts',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'styling',
      title: 'Styling',
    },
    {
      name: 'carousel',
      title: 'Carousel Settings',
    },
  ],
  fieldsets: [
    {
      name: 'styling',
      title: 'Styling & Background',
      options: {collapsible: true, collapsed: true},
    },
    // {
    //   name: 'carousel',
    //   title: 'Carousel Settings',
    //   // hidden: ({document}) => {
    //   //   const breakpoints = document?.carouselBreakpoints
    //   //   return !Array.isArray(breakpoints) || breakpoints.length === 0
    //   // },
    //   options: {collapsible: true, collapsed: false},
    // },
  ],

  fields: [
    defineField({
      group: 'content',
      name: 'internalTitle',
      type: 'string',
      title: 'Internal Title',

      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .error('Internal title is required and must be under 100 characters'),
    }),

    defineField({
      group: 'content',
      name: 'introText_raw',
      type: 'introText',
      title: 'Intro Text',
      description: 'Add intro content to appear above the collection',
    }),
    defineField({
      group: 'content',
      name: 'items_raw',
      type: 'array',
      of: [
        // Inline card object for collection-specific content
        {type: 'card'},
        // Reference existing content for reusable items
        {
          type: 'reference',
          title: 'Existing Content',
          to: [{type: 'card'}, {type: 'person'}, {type: 'blog'}, {type: 'page'}, {type: 'link'}],
        },
        {type: 'image'},
      ],
      title: 'Collection Items',

      description: 'Add collection-specific cards or reference existing content',
      validation: (Rule) =>
        Rule.min(1).warning('Consider adding at least one item to the collection'),
    }),
    defineField({
      group: 'content',
      name: 'actions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'link'}]}],
      title: 'Actions',

      description:
        'Choose a "Link" item to define the CTA. In the Link item you can define different CTA types such as linked text or a button.',
      validation: (Rule) =>
        Rule.max(2).warning('More than 2 actions may overwhelm users. Consider keeping it simple.'),
    }),
    // defineField({
    //   name: 'images',
    //   type: 'array',
    //   of: [{type: 'file'}, {type: 'image'}],
    //   title: 'Additional Images / Documents',

    //   description:
    //     '💡 These appear after the main items. For mixed ordering, add images directly to the items above.',
    //   validation: (Rule) => Rule.max(20).warning('Consider limiting images for performance'),
    // }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Layout Style',

      description: 'The layout style determines how items are arranged in the collection',
      initialValue: 'Three Per Row',
      fieldset: 'styling',
      group: 'styling',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateIn(
            ['One Per Row', 'Two Per Row', 'Three Per Row', 'Four Per Row', 'Five Per Row', 'Split Layout', 'Accordion Showcase', 'Feature Showcase'],
            value,
          ),
        ),
      options: {
        list: [
          {value: 'One Per Row', title: '1️⃣ One Per Row'},
          {value: 'Two Per Row', title: '2️⃣ Two Per Row'},
          {value: 'Three Per Row', title: '3️⃣ Three Per Row'},
          {value: 'Four Per Row', title: '4️⃣ Four Per Row'},
          {value: 'Five Per Row', title: '5️⃣ Five Per Row'},
          {value: 'Split Layout', title: '📋 Split Layout'},
          {value: 'Accordion Showcase', title: '🎵 Accordion Showcase'},
          {value: 'Feature Showcase', title: '🎯 Feature Showcase'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'itemsVariant',
      type: 'string',
      title: 'Items Style',
      fieldset: 'styling',
      group: 'styling',
      description: 'Determines the appearance of each individual item in the collection',
      initialValue: 'Default',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateIn(
            [
              'Default',
              'Icon Left',
              'Icon Center',
              'Icon Padding Left',
              'Icon Padding Center',
              'Logo',
              'Media',
              'Quote',
              'Icon Stats',
              'Icon Listing',
            ],
            value,
          ),
        ),
      options: {
        list: [
          {value: 'Default', title: 'Default Card'},
          {value: 'Icon Left', title: '🎯 Icon Left'},
          {value: 'Icon Center', title: '🎯 Icon Center'},
          {value: 'Icon Padding Left', title: '🎯 Icon Padding Left'},
          {value: 'Icon Padding Center', title: '🎯 Icon Padding Center'},
          {value: 'Logo', title: '🏢 Logo'},
          {value: 'Media', title: '🎬 Media'},
          {value: 'Quote', title: '💬 Testimonial'},
          {value: 'Icon Stats', title: '📊 Icon Stats'},
          {value: 'Icon Listing', title: '📋 Icon Listing'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      group: 'styling',
      name: 'itemsAspectRatio',
      type: 'string',
      title: 'Items Aspect Ratio',
      fieldset: 'styling',

      description: 'This will guide a minimum height for the items in the collection',
      initialValue: 'Default',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateIn(['Default', 'Horizontal', 'Vertical', 'Square'], value),
        ),
      options: {list: ['Default', 'Horizontal', 'Vertical', 'Square'], layout: 'dropdown'},
    }),

    // Carousel Settings
    defineField({
      group: 'styling',
      name: 'carouselBreakpoints',
      type: 'array',
      fieldset: 'styling',
      of: [
        {
          type: 'string',
          validation: (Rule) =>
            Rule.custom((value) => validateIn(['Mobile', 'Tablet', 'Desktop'], value)),
          options: {list: ['Mobile', 'Tablet', 'Desktop']},
        },
      ],
      title: 'Show as Carousel at These Sizes',
      // group: 'carousel',
      description: 'Should this show as a carousel? If so, at which sizes?',
      options: {
        list: [
          {value: 'Mobile', title: '📱 Mobile'},
          {value: 'Tablet', title: '📱 Tablet'},
          {value: 'Desktop', title: '🖥️ Desktop'},
        ],
        layout: 'grid',
      },
      validation: (Rule) => Rule.unique().warning('Each breakpoint should only be selected once'),
    }),
    defineField({
      name: 'carouselAutoPlay',
      type: 'boolean',
      title: 'Carousel Auto Play?',
      group: 'carousel',
      fieldset: 'styling',
      hidden: ({document}) => {
        const breakpoints = document?.carouselBreakpoints
        return !Array.isArray(breakpoints) || breakpoints.length === 0
      },
      description: 'If this is a carousel, should it auto play on load?',
      initialValue: false,
    }),
    defineField({
      name: 'showFullItemsInCarousel',
      type: 'boolean',
      title: 'Show Full Items in Carousel?',
      group: 'carousel',
      fieldset: 'styling',
      hidden: ({document}) => {
        const breakpoints = document?.carouselBreakpoints
        return !Array.isArray(breakpoints) || breakpoints.length === 0
      },
      description: 'If set to "Yes" then the carousel will not show half of the next item',
    }),

    // Styling & Background
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      fieldset: 'styling',
      group: 'styling',
    }),
    defineField({
      name: 'backgroundColor',
      type: 'string',
      title: 'Background Color',
      fieldset: 'styling',
      group: 'styling',
      initialValue: 'Light Background',
      description: 'Choose a background color from the design system',
      validation: validateBackgroundColor,
      options: {
        list: backgroundColorOptions,
        layout: 'dropdown',
      },
    }),

    defineField({
      group: 'content',
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
      variant: 'variant',
      itemCount: 'items',
      introTitle: 'introText.title',
      isCarousel: 'carouselBreakpoints',
      itemsVariant: 'itemsVariant',
    },
    prepare(selection) {
      const {title, variant, itemCount, introTitle, isCarousel, itemsVariant} = selection
      const itemCountText = Array.isArray(itemCount) ? `${itemCount.length} items` : 'No items'
      const carouselIndicator = Array.isArray(isCarousel) && isCarousel.length ? '🎠 ' : ''

      return {
        title: title || 'Untitled Collection',
        subtitle: `${carouselIndicator}${variant} • ${itemCountText} - ${itemsVariant}`,
        description: introTitle,
      }
    },
  },
  readOnly: ({document}) => (document == null ? void 0 : document.contentfulArchived) === !0,
})
