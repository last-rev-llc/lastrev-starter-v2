require('dotenv').config();

const LastRevAppConfig = require('@last-rev/app-config');
const extensions = require('graphql-extensions');
const { resolve } = require('path');

const parseNumberEnvVar = (value = '') => {
  if (!value.length) return undefined;
  const result = parseInt(value, 10);
  return Number.isNaN(result) ? undefined : result;
};

const parseBooleanEnvVar = (value = '') => {
  // values parsed as true: true, 1, yes, y, => ignore caps
  const val = value.toString().toLowerCase();
  return /^(true|1|yes|y)$/.test(val);
};

// Detect which CMS is being used based on environment variables
const hasSanityVars =
  process.env.SANITY_STUDIO_SANITY_PROJECT_ID &&
  process.env.SANITY_STUDIO_SANITY_DATASET &&
  process.env.SANITY_STUDIO_SANITY_API_VERSION &&
  process.env.SANITY_TOKEN;

const hasContentfulVars =
  process.env.CONTENTFUL_SPACE_ID &&
  process.env.CONTENTFUL_DELIVERY_TOKEN &&
  process.env.CONTENTFUL_ENV;

// Determine CMS type and content strategy
let cmsType = null;
let contentStrategy = 'fs'; // Default to file system if no CMS vars are present
let cmsConfig = {};

if (hasSanityVars) {
  cmsType = 'Sanity';
  contentStrategy = 'cms';
  let schemaTypes, supportedLanguages;
  try {
    const sanityStudio = require('sanity-studio');
    schemaTypes = sanityStudio.types;
    supportedLanguages = sanityStudio.supportedLanguages;
  } catch (error) {
    // If sanity-studio is not available, use empty arrays
    console.warn('Warning: sanity-studio module not available, using empty schema types');
    schemaTypes = [];
    supportedLanguages = [];
  }
  
  cmsConfig = {
    sanity: {
      projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID,
      dataset: process.env.SANITY_STUDIO_SANITY_DATASET,
      apiVersion: process.env.SANITY_STUDIO_SANITY_API_VERSION,
      usePreview: parseBooleanEnvVar(process.env.USE_PREVIEW),
      token: process.env.SANITY_TOKEN,
      schemaTypes,
      supportedLanguages
    }
  };
} else if (hasContentfulVars) {
  cmsType = 'Contentful';
  contentStrategy = 'cms';
  cmsConfig = {
    contentful: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      deliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
      previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
      environment: process.env.CONTENTFUL_ENV,
      usePreview: parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW || process.env.USE_PREVIEW)
    }
  };
} else {
  // No CMS vars available - use file system strategy
  console.warn(
    'Warning: No CMS environment variables detected. Using file system content strategy. ' +
    'Set either Sanity or Contentful environment variables to use CMS integration.'
  );
}

const config = new LastRevAppConfig({
  ...(cmsType && { cms: cmsType }),
  contentStrategy,
  // cmsCacheStrategy: 'redis',
  sites: process.env.SITE ? [process.env.SITE] : [],
  extensions,
  graphql: { port: 8888 },
  ...cmsConfig,
  // algolia: {
  //   applicationId: process.env.ALGOLIA_APPLICATION_ID,
  //   adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
  //   contentTypeIds: ['blog', 'page', 'pageProperty', 'person'],
  //   indexDraftContent: parseBooleanEnvVar(process.env.ALGOLIA_INDEX_DRAFT_CONTENT),
  //   maxBatchSize: process.env.ALGOLIA_MAX_BATCH_SIZE
  //     ? parseInt(process.env.ALGOLIA_MAX_BATCH_SIZE, 10)
  //     : 400
  // },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
    tls: {},
    maxBatchSize: parseNumberEnvVar(process.env.REDIS_MAX_BATCH_SIZE)
  },
  logLevel: 'debug',
  fs: {
    contentDir: resolve(__dirname, '.cms-sync')
  },
  sitemap: {
    domain: `${process.env.DOMAIN}`,
    excludePages: ['error_404'],
    maxPageSize: 100
  },
  apolloServerOptions: {
    introspection: true
  },
  features: {
    disableCoreSidekickLookup: true
  }
});

module.exports = config;
