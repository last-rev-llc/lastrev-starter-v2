import dotenv from 'dotenv';
import { defineConfig } from 'cypress';
import { resolve } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

dotenv.config({
  path: resolve(__dirname, '../../.env')
});

const SPACE = `${process.env.CONTENTFUL_SPACE_ID}`;
const ENV = process.env.CONTENTFUL_ENV || 'master';
const PREVIEW_OR_PROD =
  `${process.env.CONTENTFUL_USE_PREVIEW}`.toLowerCase() === 'true' ? 'preview' : 'production';
const SITE = `${process.env.SITE}`;

export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,

  e2e: {
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      // Generating the page fixtures here because the last-rev lib does not support app dir
      const pathsPath = resolve(
        __dirname,
        `../../packages/graphql-sdk/.cms-sync/${SPACE}/${ENV}/${PREVIEW_OR_PROD}/path_data/${SITE}.json`
      );
      const generatedPagesPath = resolve(__dirname, './cypress/fixtures/generated_pages.json');

      if (!existsSync(generatedPagesPath)) {
        console.debug('Pages Fixture not found, generating...');
        if (!existsSync(pathsPath)) {
          console.debug('No paths file found. Skipping Generation...');
          return config;
        }
        writeFileSync(
          generatedPagesPath,
          JSON.stringify(Object.keys(JSON.parse(readFileSync(pathsPath, 'utf8'))), null, 2)
        );
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
