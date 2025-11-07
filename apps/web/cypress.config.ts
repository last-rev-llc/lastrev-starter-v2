import dotenv from 'dotenv';
import { defineConfig } from 'cypress';
import { resolve } from 'path';
import { existsSync, readFileSync, writeFileSync, statSync } from 'fs';

dotenv.config({
  path: resolve(__dirname, '../../.env')
});

// Support both Sanity and Contentful (legacy)
const PROJECT_ID = process.env.SANITY_STUDIO_SANITY_PROJECT_ID || process.env.CONTENTFUL_SPACE_ID;
const DATASET = process.env.SANITY_STUDIO_SANITY_DATASET || process.env.CONTENTFUL_ENV || 'master';
const PREVIEW_OR_PROD =
  `${process.env.USE_PREVIEW || process.env.CONTENTFUL_USE_PREVIEW}`.toLowerCase() === 'true'
    ? 'preview'
    : 'production';
const SITE = `${process.env.SITE}`;

export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,

  e2e: {
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      // Generating the page fixtures here because the last-rev lib does not support app dir
      // Try Sanity path structure (PROJECT_ID/DATASET/PREVIEW_OR_PROD/path_data/SITE.json)
      const pathsPath = resolve(
        __dirname,
        `../../packages/graphql-sdk/.cms-sync/${PROJECT_ID}/${DATASET}/${PREVIEW_OR_PROD}/path_data/${SITE}.json`
      );
      const generatedPagesPath = resolve(__dirname, './cypress/fixtures/generated_pages.json');

      // Always regenerate if source file exists and is newer, or if generated file doesn't exist
      if (existsSync(pathsPath)) {
        const shouldRegenerate =
          !existsSync(generatedPagesPath) ||
          statSync(pathsPath).mtime > statSync(generatedPagesPath).mtime;

        if (shouldRegenerate) {
          console.debug('Regenerating pages fixture from CMS sync data...');
          try {
            const pathData = JSON.parse(readFileSync(pathsPath, 'utf8'));
            const pages = Object.keys(pathData);
            writeFileSync(generatedPagesPath, JSON.stringify(pages, null, 2));
            console.debug(`Generated ${pages.length} pages in fixture`);
          } catch (error) {
            console.error('Error generating pages fixture:', error);
            if (!existsSync(generatedPagesPath)) {
              console.warn('Using existing generated_pages.json if available');
            }
          }
        }
      } else {
        console.debug(
          'No paths file found. Skipping generation. Run "pnpm --filter graphql-sdk sync:cms" first.'
        );
        if (!existsSync(generatedPagesPath)) {
          console.warn('No generated_pages.json found and no source data available.');
        }
      }

      const nextPagesPath = resolve(__dirname, './.next/server/pages');
      const fixturePagesPath = resolve(__dirname, './cypress/fixtures');
      const integrationPath = resolve(__dirname, './cypress/e2e');

      require('@last-rev/testing-library/src/cypress/plugins/generatePages')({
        nextPagesPath,
        fixturePagesPath,
        integrationPath
      });
      return config;
    }
  },

  retries: {
    runMode: 2,
    openMode: 0
  },

  projectId: process.env.CYPRESS_PROJECT_ID,
  video: !!process.env.CYPRESS_RECORD_KEY
});
