#!/usr/bin/env node

// Always run cms-sync - config.js will handle file system strategy if no CMS vars are present
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if CMS environment variables are available (for informational purposes)
const hasSanityVars =
  process.env.SANITY_STUDIO_SANITY_PROJECT_ID &&
  process.env.SANITY_STUDIO_SANITY_DATASET &&
  process.env.SANITY_STUDIO_SANITY_API_VERSION &&
  process.env.SANITY_TOKEN;

const hasContentfulVars =
  process.env.CONTENTFUL_SPACE_ID &&
  process.env.CONTENTFUL_DELIVERY_TOKEN &&
  process.env.CONTENTFUL_ENV;

if (!hasSanityVars && !hasContentfulVars) {
  console.warn(
    '⚠️  No CMS environment variables detected. Using file system content strategy.\n' +
    '   Set either Sanity or Contentful environment variables to enable CMS sync.'
  );
  
  // Ensure .cms-sync directory exists for file system strategy
  const cmsSyncDir = path.resolve(__dirname, '..', '.cms-sync');
  if (!fs.existsSync(cmsSyncDir)) {
    fs.mkdirSync(cmsSyncDir, { recursive: true });
    console.log('Created .cms-sync directory for file system strategy');
  }
}

// Always run cms-sync - it will use file system strategy if no CMS vars are present
try {
  execSync('last-rev cms-sync -c ./config.js', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
} catch (error) {
  // If sync fails but we're using fs strategy, that's okay - the directory structure might already exist
  if (!hasSanityVars && !hasContentfulVars) {
    console.warn('CMS sync failed, but continuing with file system strategy:', error.message);
    // Don't fail the build if we're using fs strategy
    process.exit(0);
  } else {
    console.error('CMS sync failed:', error.message);
    process.exit(1);
  }
}

