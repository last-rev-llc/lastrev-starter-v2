/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  transpilePackages: ['ui', 'graphql-sdk', '@mui/material', '@mui/system', '@mui/icons-material'],
  images: {
    unoptimized: true,
    domains: ['images.ctfassets.net']
  },
  webpack: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          fs: false
        },
        alias: {
          ...config.resolve.alias,
          '@mui/styled-engine': '@mui/styled-engine-sc'
        }
      }
    };
  }
};
