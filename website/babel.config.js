/* eslint-env node */

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'styled-components',
      {
        ssr: true,
        displayName: !isProduction,
        minify: isProduction,
        transpileTemplateLiterals: isProduction,
        pure: isProduction,
      },
    ],
  ],
};
