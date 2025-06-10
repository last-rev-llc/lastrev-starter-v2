const fs = require('fs')
const path = require('path')

// Read the schema file
const schemaPath = path.join(__dirname, '..', 'schema.ts')
const schemaContent = fs.readFileSync(schemaPath, 'utf8')

// Regular expression to match contentful{CapitalizedTerm}Type
const regex = /contentful([A-Z][a-zA-Z]*)Type/g

// Replace matches with contentful_{lowercaseTerm}Type
let updatedContent = schemaContent.replace(regex, (match, term) => {
  const lowercaseTerm = term.charAt(0).toLowerCase() + term.slice(1)
  return `contentful_${lowercaseTerm}Type`
})

// Add // @ts-expect-error above every initialValue: { line
updatedContent = updatedContent.replace(
  /^(\s*)(initialValue:\s*\{)/gm,
  '$1// @ts-expect-error\n$1$2',
)

// Fix Rule.required().regex to (Rule.required() as any).regex
updatedContent = updatedContent.replace(/(\bRule\.required\(\))(\.regex)/g, '($1 as any)$2')

// Write the updated content back to the file
fs.writeFileSync(schemaPath, updatedContent, 'utf8')

console.log('Schema file has been updated successfully!')
