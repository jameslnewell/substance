#!/usr/bin/env node
/* eslint-env node */
require('ts-node').register({
  files: true,
  project: `${__dirname}/tsconfig.json`,
});
require('./src/setup');
