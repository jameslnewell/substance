/* eslint-env node */
const path = require('path');
const withMDX = require('@next/mdx')({extension: /\.mdx$/});

module.exports = withMDX({
  experimental: {
    jsconfigPaths: true,
  },
  pageExtensions: ['mdx', 'tsx'],
  webpack: (config, options) => {
    // compile monorepo packages
    config.module.rules.push({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      include: [path.join(path.dirname(__dirname), 'packages')],
      use: [options.defaultLoaders.babel],
    });
    return config;
  },
});
