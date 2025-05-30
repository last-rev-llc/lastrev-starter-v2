// sanity.cli.js
import {defineCliConfig} from 'sanity/cli'

console.log('🚀 SANITY_STUDIO_SANITY_PROJECT_TITLE', process.env.SANITY_STUDIO_SANITY_PROJECT_TITLE)

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_SANITY_DATASET,
  },
  studioHost: 'last-rev-starter',
  vite: {
    optimizeDeps: {
      include: ['sanity-schema'],
    },
    build: {
      commonjsOptions: {
        include: [/sanity-schema/],
      },
    },
  },
})
