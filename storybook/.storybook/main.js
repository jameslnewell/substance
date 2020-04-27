const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../../packages/**/src/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          transpileOnly: true,
        },
      },
    },
  ],
  webpackFinal: (config) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    return config;
  },
};
