import {DefaultDocumentNodeResolver} from 'sanity/structure'
import {Iframe} from 'sanity-plugin-iframe-pane'

// Get the preview URL based on environment
const getPreviewUrl = (doc: any) => {
  const baseUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
  const id = doc._id.replace(/^drafts\./, '')
  return `${baseUrl}/preview/${id}`
}

// Previewable document types
const PREVIEWABLE_TYPES = ['page', 'hero', 'section', 'contentful_block', 'collection', 'collectionDynamic']

// Default document node for adding preview to specific types
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (PREVIEWABLE_TYPES.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc: any) => getPreviewUrl(doc),
          reload: {
            button: true,
          },
          defaultSize: 'desktop',
        })
        .title('Preview')
    ])
  }
  
  return S.document().views([S.view.form()])
}