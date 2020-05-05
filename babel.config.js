/* eslint-env commonjs */
module.exports = {
  presets: ['@jameslnewell/babel-preset'],
  plugins: [
    ['styled-components', {ssr: true, displayName: true, preprocess: false}],
  ],
};
