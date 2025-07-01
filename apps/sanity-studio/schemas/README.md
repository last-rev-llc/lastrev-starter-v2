# Sanity Schema Organization

This directory contains all Sanity schema definitions organized by type.

## Directory Structure

```
schemas/
├── documents/     # Document schemas (standalone content types)
├── objects/       # Object schemas (reusable field groups)  
├── components/    # Component schemas (UI components)
├── utils/         # Utility functions for schemas
└── index.ts       # Main export file
```

## Schema Types

### Documents
Document schemas represent standalone content types that can be created and managed independently in Sanity Studio:

- **blog** - Blog post entries
- **categoryBlog** - Blog categories
- **collection** - Content collections
- **collectionDynamic** - Dynamic collections with filtering
- **collectionExpandable** - Expandable/collapsible collections
- **collectionExpandableItem** - Items for expandable collections
- **contentful_block** - Rich text content blocks
- **contentful_text** - Text content
- **elementForm** - Form elements
- **elementVideo** - Video elements
- **footer** - Site footer configuration
- **header** - Site header configuration
- **hero** - Hero sections
- **link** - CTA links
- **media** - Media assets
- **moduleIntegration** - Third-party integrations
- **navigationItem** - Navigation menu items
- **page** - General pages
- **person** - People/author profiles
- **section** - Page sections
- **settings** - Site settings
- **site** - Site configuration
- **siteRedirect** - URL redirects
- **tag** - Content tags
- **template** - Page templates
- **test** - Test content type

### Objects
Object schemas are reusable field groups that can be embedded in documents:

- **break** - Line break/separator
- **card** - Card component for collections
- **introText** - Introduction text blocks
- **seo** - SEO metadata fields

## Usage

All schemas are automatically imported and exported through `index.ts`. To use them in your Sanity configuration:

```typescript
import { allSchemas } from './schemas'

export default defineConfig({
  // ... other config
  schema: {
    types: allSchemas,
  },
})
```

## Adding New Schemas

1. Create a new `.ts` file in the appropriate directory
2. Define your schema using Sanity's `defineType` and `defineField` functions
3. Export the schema from the file
4. Add the export to `index.ts`
5. Add the schema to the `allSchemas` array

## Utilities

The `utils/` directory contains helper functions:

- **ai-generation.ts** - AI content generation helpers
- **validation.ts** - Custom validation functions