// sanity.cli.js
import {defineCliConfig} from 'sanity/cli'
// import commonjs from '@rollup/plugin-commonjs'
// import {resolve} from 'path'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_SANITY_DATASET,
  },
  studioHost: 'last-rev-starter',
})
