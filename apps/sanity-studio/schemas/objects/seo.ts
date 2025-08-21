import { defineType, defineField } from 'sanity'
import { withAIGeneration } from '../utils/ai-generation'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',

  /* -------- fieldsets -------- */
  fieldsets: [
    {name: 'general', title: 'General', options: {collapsible: true, collapsed: true}},
    {name: 'og', title: 'Open Graph', options: {collapsible: true, collapsed: true}},
    {name: 'twitter', title: 'Twitter', options: {collapsible: true, collapsed: true}},
  ],

  /* -------- fields -------- */
  fields: [
    /* General ---------------------------------------------------- */
    withAIGeneration(
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        fieldset: 'general',
        initialValue: ({parent}) => parent?.internalTitle || '',
      }),
    ),
    withAIGeneration(
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 3,
        fieldset: 'general',
      }),
    ),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      fieldset: 'general',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      fieldset: 'general',
      validation: (r) => r.uri({scheme: ['https'], allowRelative: false}),
    }),
    defineField({
      name: 'index',
      title: 'Indexed by search engines?',
      type: 'boolean',
      initialValue: true,
      fieldset: 'general',
    }),
    defineField({
      name: 'follow',
      title: 'Follow links from this page?',
      type: 'boolean',
      initialValue: true,
      fieldset: 'general',
    }),

    /* Facebook --------------------------------------------------- */
    withAIGeneration(
      defineField({
        name: 'ogTitle',
        title: 'Post title',
        type: 'string',
        fieldset: 'og',
      }),
    ),
    withAIGeneration(
      defineField({
        name: 'ogDescription',
        title: 'Description',
        type: 'text',
        rows: 3,
        fieldset: 'og',
      }),
    ),
    defineField({
      name: 'ogImage',
      title: 'Post image',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'og',
    }),

    /* Twitter ---------------------------------------------------- */
    withAIGeneration(
      defineField({
        name: 'twTitle',
        title: 'Post title',
        type: 'string',
        fieldset: 'twitter',
      }),
    ),
    withAIGeneration(
      defineField({
        name: 'twDescription',
        title: 'Description',
        type: 'text',
        rows: 3,
        fieldset: 'twitter',
      }),
    ),
    defineField({
      name: 'twImage',
      title: 'Post image',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'twitter',
    }),
  ],

  /* -------- preview (optional) -------- */
  preview: {
    select: {title: 'title', index: 'index'},
    prepare({title, index}) {
      return {
        title: title ?? 'SEO settings',
        subtitle: index === false ? '🚫 No-index' : 'Indexable',
      }
    },
  },
})