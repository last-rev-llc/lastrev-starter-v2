import { join, dirname } from 'path';
import { StorybookConfig } from '@storybook/nextjs';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/!(_archived)/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
    getAbsolutePath('@chromatic-com/storybook')
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  async webpackFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@mui/styled-engine': getAbsolutePath('@mui/styled-engine-sc')
        }
      }
    };
  },
  docs: {}
};

export default config;
