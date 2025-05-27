import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {types as schemaTypes} from './schema'
import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_PROJECT_TITLE!,
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      // Required
      // Either: an array of supported languages...
      supportedLanguages: [{id: 'en-US', title: 'English'}],
      // ...or a function that takes the client and returns a promise of an array of supported languages
      // MUST return an "id" and "title" as strings
      // Note: Async language configuration cannot create templates for new documents
      // supportedLanguages: (client) => client.fetch(`*[_type == "language"]{id, title}`),

      // Required
      // Translations UI will only appear on these schema types
      schemaTypes: schemaTypes.map((type) => type.name),

      // Optional
      // Customizes the name of the language field
      languageField: `lastrev__language`, // defauts to "language"

      // Optional
      // Keep translation.metadata references weak
      weakReferences: true, // defaults to false

      // Optional
      // Adds UI for publishing all translations at once. Requires access to the Scheduling API
      // https://www.sanity.io/docs/scheduling-api
      bulkPublish: true, // defaults to false

      // Optional
      // Adds additional fields to the metadata document
      // metadataFields: [
      //   defineField({ name: 'slug', type: 'slug' }),
      // ],

      // Optional
      // Define API Version for all queries
      // https://www.sanity.io/docs/api-versioning
      // apiVersion: '2023-05-22',

      // Optional
      // Enable "manage translations" button without creating a translated version. Helpful if you have
      // pre-existing documents that you need to tie together through the metadata document
      allowCreateMetaDoc: true, // defaults to false

      // Optional
      // Callback function that runs after a translation document has been created
      // Note: Defaults to null
      // callback: ({
      //   sourceDocument, // The document in the original language
      //   newDocument, // The newly created translation of the source document
      //   sourceLanguageId, // The id of the original language
      //   destinationLanguageId, // The id of the destination language
      //   metaDocumentId, // The id of the meta document referencing the document translations
      //   client // Sanity client
      // }) {
      //   // Your function implementation
      // }
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
