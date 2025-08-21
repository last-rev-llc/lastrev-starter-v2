import { type SchemaTypeDefinition } from 'sanity'
import { allSchemas } from './schemas'

export const types = allSchemas

export const schema: { types: SchemaTypeDefinition[] } = {
  types: allSchemas,
}