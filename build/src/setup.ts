import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

import {
  emptyBuildDirectory,
  getSourceDirectory,
  getPackageManifest,
  getEntryFile,
  getBuildBundleTypeFile,
  getBuildBundleFile,
} from './utils';

const writeFile = util.promisify(fs.writeFile);

export function getBuildBundleContent(format: 'cjs' | 'esm', manifest: any) {
  const entryFile = getEntryFile(manifest);
  const relativeFile = path.basename(
    path.relative(getSourceDirectory(), entryFile),
    path.extname(entryFile),
  );
  return `
const register = require('@babel/register');
register({
  extensions: [".ts", ".tsx"],
  presets: [['@jameslnewell/babel-preset', {modules: ${
    format === 'cjs' ? '"commonjs"' : 'false'
  }}]],
});
/*
  We're relying on the assumption that each of our pacakges are using named exports
*/
module.exports = require("../src/${relativeFile}");
register.revert();
`;
}

export function getBuildBundleTypeFileContent(manifest: any) {
  const entryFile = getEntryFile(manifest);
  const relativeFile = path.basename(
    path.relative(getSourceDirectory(), entryFile),
    path.extname(entryFile),
  );
  return `
/*
  We're relying on the assumption that each of our pacakges are using named exports
*/
export * from "../src/${relativeFile}";
`;
}

(async () => {
  const manifest = await getPackageManifest();
  try {
    await emptyBuildDirectory();
    await Promise.all([
      writeFile(
        getBuildBundleFile('cjs', manifest),
        getBuildBundleContent('cjs', manifest),
      ),
      writeFile(
        getBuildBundleTypeFile('cjs', manifest),
        getBuildBundleTypeFileContent(manifest),
      ),
      writeFile(
        getBuildBundleFile('esm', manifest),
        getBuildBundleContent('esm', manifest),
      ),
      writeFile(
        getBuildBundleTypeFile('esm', manifest),
        getBuildBundleTypeFileContent(manifest),
      ),
    ]);
    console.log(`✅ Finished initialising "${manifest.name}"`);
  } catch (error) {
    console.error(`❌ Error initialising "${manifest.name}"`);
    console.error(error);
    process.exitCode = -1;
  }
})();
