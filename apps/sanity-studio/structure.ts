import {StructureBuilder} from 'sanity/structure'
import {EyeOpenIcon, DocumentIcon, ComponentIcon, UserIcon} from '@sanity/icons'
import {Iframe} from 'sanity-plugin-iframe-pane'

// Get the preview URL based on environment
const getPreviewUrl = (doc: any) => {
  // Use environment variable if available, otherwise use localhost
  const baseUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
  
  // Remove the 'drafts.' prefix from the document ID if present
  const id = doc._id.replace(/^drafts\./, '')
  
  // Always use the preview route with document ID
  return `${baseUrl}/preview/${id}`
}

// Content types that should have preview functionality
const PREVIEWABLE_TYPES = ['page', 'hero', 'section', 'contentful_block', 'collection', 'collectionDynamic']

// Helper to create a document view with preview
const createDocumentViewWithPreview = (S: StructureBuilder, schemaType: string) => {
  return S.document()
    .schemaType(schemaType)
    .views([
      // Default form view
      S.view.form().title('Editor'),
      // Preview only view
      S.view
        .component(Iframe)
        .options({
          url: (doc: any) => getPreviewUrl(doc),
          reload: {
            button: true, // Show reload button
          },
          defaultSize: 'desktop', // Default preview size
        })
        .title('Preview')
        .icon(EyeOpenIcon)
    ])
}

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Pages with preview
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .schemaType('page')
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .child((documentId) =>
              createDocumentViewWithPreview(S, 'page').documentId(documentId)
            )
        ),
      
      // Components section with preview-enabled types
      S.listItem()
        .title('Components')
        .icon(ComponentIcon)
        .child(
          S.list()
            .title('Components')
            .items([
              S.listItem()
                .title('Heroes')
                .schemaType('hero')
                .child(
                  S.documentTypeList('hero')
                    .title('Heroes')
                    .child((documentId) =>
                      createDocumentViewWithPreview(S, 'hero').documentId(documentId)
                    )
                ),
              S.listItem()
                .title('Sections')
                .schemaType('section')
                .child(
                  S.documentTypeList('section')
                    .title('Sections')
                    .child((documentId) =>
                      createDocumentViewWithPreview(S, 'section').documentId(documentId)
                    )
                ),
              S.listItem()
                .title('Content Blocks')
                .schemaType('contentful_block')
                .child(
                  S.documentTypeList('contentful_block')
                    .title('Content Blocks')
                    .child((documentId) =>
                      createDocumentViewWithPreview(S, 'contentful_block').documentId(documentId)
                    )
                ),
              S.listItem()
                .title('Collections')
                .schemaType('collection')
                .child(
                  S.documentTypeList('collection')
                    .title('Collections')
                    .child((documentId) =>
                      createDocumentViewWithPreview(S, 'collection').documentId(documentId)
                    )
                ),
              S.listItem()
                .title('Dynamic Collections')
                .schemaType('collectionDynamic')
                .child(
                  S.documentTypeList('collectionDynamic')
                    .title('Dynamic Collections')
                    .child((documentId) =>
                      createDocumentViewWithPreview(S, 'collectionDynamic').documentId(documentId)
                    )
                ),
            ])
        ),

      // People
      S.listItem()
        .title('People')
        .icon(UserIcon)
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),

      // Site Settings
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Configuration')
                .schemaType('site')
                .child(S.documentTypeList('site').title('Site Configuration')),
              S.listItem()
                .title('Header')
                .schemaType('header')
                .child(S.documentTypeList('header').title('Header')),
              S.listItem()
                .title('Footer')
                .schemaType('footer')
                .child(S.documentTypeList('footer').title('Footer')),
              S.listItem()
                .title('General Settings')
                .schemaType('settings')
                .child(S.documentTypeList('settings').title('Settings')),
            ])
        ),
      
      // Divider
      S.divider(),
      
      // All other document types, sorted alphabetically
      ...S.documentTypeListItems()
        .filter(listItem => {
          const id = listItem.getId()
          return ![
            'page', 'hero', 'section', 'contentful_block', 'collection', 
            'collectionDynamic', 'person', 'site', 'header', 'footer', 'settings'
          ].includes(id!)
        })
        .sort((a, b) => (a.getTitle() || '').localeCompare(b.getTitle() || ''))
    ])