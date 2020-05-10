const path = require('path');

module.exports = {
  stories: [
    // '../../packages/**/src/**/*.stories.tsx',
    '../src/**/*.stories.tsx',
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'babel-loader',
    });
    config.resolve.extensions = ['.tsx', '.ts', ...config.resolve.extensions];
    return config;
  },
};
