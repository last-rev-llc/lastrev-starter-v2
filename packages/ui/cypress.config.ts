import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    specPattern: 'src/**/*spec.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  }
});
