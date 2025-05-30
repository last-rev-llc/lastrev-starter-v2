const fs = require('fs')
const path = require('path')

// Read the schema file
const schemaPath = path.join(__dirname, '..', 'schema.js')
const schemaContent = fs.readFileSync(schemaPath, 'utf8')

// Regular expression to match contentful{CapitalizedTerm}Type
const regex = /contentful([A-Z][a-zA-Z]*)Type/g

// Replace matches with contentful_{lowercaseTerm}Type
let updatedContent = schemaContent.replace(regex, (match, term) => {
  const lowercaseTerm = term.charAt(0).toLowerCase() + term.slice(1)
  return `contentful_${lowercaseTerm}Type`
})

// Convert ESM exports to CommonJS
// First, remove all 'export const' declarations
updatedContent = updatedContent.replace(/export const /g, 'const ')

// Add module.exports at the end
updatedContent += '\n\nmodule.exports = {\n'
// Find all const declarations and add them to exports
const constRegex = /const (\w+) =/g
let match
const exportNames = []
while ((match = constRegex.exec(updatedContent)) !== null) {
  exportNames.push(match[1])
}
// Add each export to the module.exports
exportNames.forEach((exportName) => {
  updatedContent += `  ${exportName},\n`
})
updatedContent += '}\n'

// Write the updated content back to the file
fs.writeFileSync(schemaPath, updatedContent, 'utf8')

console.log('Schema file has been updated successfully!')
