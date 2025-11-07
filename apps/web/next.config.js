// TODO: Add CSP policies and security headers
// TODO: Add support for localization (i18n)
const { withSentryConfig } = require('@sentry/nextjs');
const { client } = require('graphql-sdk/dist/client');

const preview = process.env.USE_PREVIEW === 'true';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE?.toLowerCase() === 'true'
});

const hasAllSentryVars = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

if (!hasAllSentryVars) {
  /* eslint-disable-next-line no-console */
  console.warn('Sentry is disabled. Please check your environment variables.');
}

let config = {
  productionBrowserSourceMaps: true,
  typescript: {
    // !! WARN !!
    // TODO: Clean all typescript build errors
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  ...(hasAllSentryVars && {
    sentry: {
      disableServerWebpackPlugin: !hasAllSentryVars,
      disableClientWebpackPlugin: !hasAllSentryVars,
      hideSourceMaps: false,
      widenClientFileUpload: true
    }
  }),
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['ui', 'graphql-sdk', '@mui/material', '@mui/system', '@mui/icons-material'],
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: `/${process.env.CONTENTFUL_SPACE_ID}/**`
      },
      {
        protocol: 'https',
        hostname: 'images.contentful.com',
        port: '',
        pathname: `/${process.env.CONTENTFUL_SPACE_ID}/**`
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**'
      }
    ],
    formats: ['image/webp']
  },
  env: {
    //ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
    //ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
    //GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
    CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY ?? '',
    CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
    CONTENTFUL_ENV: process.env.CONTENTFUL_ENV,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
    CONTENTFUL_SETTINGS_ID: process.env.CONTENTFUL_SETTINGS_ID ?? '',
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_USE_PREVIEW: process.env.CONTENTFUL_USE_PREVIEW,
    DEFAULT_SITE_ID: process.env.DEFAULT_SITE_ID,
    DEPLOY_URL: process.env.DEPLOY_URL,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    // TODO: need to pass other sanity vars?
    SANITY_USE_PREVIEW: process.env.USE_PREVIEW,
    SITE_SETTINGS: process.env.SITE_SETTINGS ?? '',
    SITE: process.env.SITE,
    VERCEL_URL: process.env.VERCEL_URL
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc'
    };

    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        '@mui/styled-engine': '@mui/styled-engine-sc'
      }
    }
  },
  async redirects() {
    try {
      const { data } = await client.Redirects({ preview });
      return data?.redirects ?? [];
    } catch (error) {
      // During build, if GraphQL server is not available, return empty array
      console.warn('Warning: Could not fetch redirects during build:', error.message);
      return [];
    }
  },
  async rewrites() {
    try {
      const { data } = await client.Rewrites({ preview });
      return data?.rewrites ?? [];
    } catch (error) {
      // During build, if GraphQL server is not available, return empty array
      console.warn('Warning: Could not fetch rewrites during build:', error.message);
      return [];
    }
  }
};

if (hasAllSentryVars) config = withSentryConfig(config);
config = withBundleAnalyzer(config);
module.exports = config;
