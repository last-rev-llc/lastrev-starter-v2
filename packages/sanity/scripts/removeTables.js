const fs = require('fs');
const readline = require('readline');

function processRichText(node) {
  if (!node) return node;

  if (node.nodeType === 'table') {
    return null;
  }

  if (node.content && Array.isArray(node.content)) {
    node.content = node.content
      .map((child) => processRichText(child))
      .filter((child) => child !== null);
  }

  return node;
}

function processEntries(entries) {
  let tablesRemoved = 0;

  entries.forEach((entry) => {
    // Find all fields that might contain rich text
    Object.entries(entry.fields).forEach(([fieldName, fieldValue]) => {
      if (fieldValue && typeof fieldValue === 'object') {
        // Handle localized fields
        Object.entries(fieldValue).forEach(([locale, value]) => {
          // Check if this is a rich text field
          if (value && value.nodeType === 'document') {
            const originalContentLength = value.content ? value.content.length : 0;

            if (value.content) {
              value.content = value.content
                .map((node) => processRichText(node))
                .filter((node) => node !== null);

              // Count removed tables
              tablesRemoved += originalContentLength - (value.content ? value.content.length : 0);
            }
          }
        });
      }
    });
  });

  return tablesRemoved;
}

// Read and process both files
const contentfulJson = JSON.parse(fs.readFileSync('./contentful.json', 'utf8'));
const contentfulPublishedJson = JSON.parse(fs.readFileSync('./contentful.published.json', 'utf8'));

const tablesRemovedFromDraft = processEntries(contentfulJson.entries);
const tablesRemovedFromPublished = processEntries(contentfulPublishedJson.entries);
const totalTablesRemoved = tablesRemovedFromDraft + tablesRemovedFromPublished;

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for confirmation
rl.question(
  `About to overwrite files with ${totalTablesRemoved} tables removed. Continue? (y/N) `,
  (answer) => {
    if (answer.toLowerCase() === 'y') {
      fs.writeFileSync('./contentful.json', JSON.stringify(contentfulJson, null, 2));
      fs.writeFileSync(
        './contentful.published.json',
        JSON.stringify(contentfulPublishedJson, null, 2)
      );
      console.log('Files have been updated successfully.');
    } else {
      console.log('Operation cancelled.');
    }
    rl.close();
  }
);
