// ./structure.js or wherever you define your desk structure
import {StructureBuilder} from 'sanity/structure'

console.log('🚀 Structure file is being loaded!')

const BUNDLED_DOC_TYPES = ['sanity.imageAsset', 'sanity.fileAsset']

// TODO: add a better structure. this dfile does not work.

export const structure = (S: StructureBuilder, context: {schema: any}) => {
  S.list()
    .title('Content')
    .items(
      // Get all document type list items and sort them by title
      S.documentTypeListItems().sort((a, b) =>
        (a.getTitle() || '').localeCompare(b.getTitle() || ''),
      ),
    )
}
