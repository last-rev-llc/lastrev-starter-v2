#!/usr/bin/env node

/**
 * Regenerates the Cypress pages fixture from CMS sync data.
 *
 * This script reads the path_data JSON file from the CMS sync and generates
 * the generated_pages.json file used by Cypress tests.
 *
 * Usage:
 *   pnpm --filter web cypress:regenerate-pages
 *
 * Or ensure CMS is synced first:
 *   pnpm --filter graphql-sdk sync:cms
 *   pnpm --filter web cypress:regenerate-pages
 */

const dotenv = require('dotenv');
const { resolve } = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');

// Load environment variables
dotenv.config({
  path: resolve(__dirname, '../../../.env')
});

// Support both Sanity and Contentful (legacy)
const PROJECT_ID = process.env.SANITY_STUDIO_SANITY_PROJECT_ID || process.env.CONTENTFUL_SPACE_ID;
const DATASET = process.env.SANITY_STUDIO_SANITY_DATASET || process.env.CONTENTFUL_ENV || 'master';
const PREVIEW_OR_PROD =
  `${process.env.USE_PREVIEW || process.env.CONTENTFUL_USE_PREVIEW}`.toLowerCase() === 'true'
    ? 'preview'
    : 'production';
const SITE = process.env.SITE;

if (!PROJECT_ID || !SITE) {
  console.error(
    'Error: SANITY_STUDIO_SANITY_PROJECT_ID (or CONTENTFUL_SPACE_ID) and SITE environment variables are required'
  );
  console.error('Make sure you have a .env file in the project root with these variables set');
  process.exit(1);
}

// Construct path - for Sanity: PROJECT_ID/DATASET/PREVIEW_OR_PROD/path_data/SITE.json
// (same structure as Contentful, just different variable names)
const cmsSyncDir = resolve(__dirname, '../../../packages/graphql-sdk/.cms-sync');
const pathsPath = resolve(
  cmsSyncDir,
  `${PROJECT_ID}/${DATASET}/${PREVIEW_OR_PROD}/path_data/${SITE}.json`
);
const generatedPagesPath = resolve(__dirname, '../cypress/fixtures/generated_pages.json');

console.log('Regenerating Cypress pages fixture...');
console.log(`Source: ${pathsPath}`);
console.log(`Target: ${generatedPagesPath}`);

if (!existsSync(pathsPath)) {
  console.error(`\nError: Source file not found: ${pathsPath}`);
  console.error('\nPlease run CMS sync first:');
  console.error('  pnpm --filter graphql-sdk sync:cms');
  process.exit(1);
}

try {
  const pathData = JSON.parse(readFileSync(pathsPath, 'utf8'));
  const pages = Object.keys(pathData);

  writeFileSync(generatedPagesPath, JSON.stringify(pages, null, 2));

  console.log(`\n✓ Successfully generated ${pages.length} pages:`);
  pages.forEach((page) => console.log(`  - ${page}`));
  console.log(`\nFile written to: ${generatedPagesPath}`);
  console.log('\nNote: Cypress test files will be regenerated automatically when you run Cypress.');
} catch (error) {
  console.error('\nError generating pages fixture:', error.message);
  process.exit(1);
}
