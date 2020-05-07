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

export function getBuildBundleContent(_format: 'cjs' | 'esm', manifest: any) {
  const entryFile = getEntryFile(manifest);
  const relativeFile = path.basename(
    path.relative(getSourceDirectory(), entryFile),
    path.extname(entryFile),
  );
  return `
const register = require('@babel/register');
register({
  extensions: [".tsx", ".ts"],
  // this package is likely already in node_modules so we shouldn't ignore node_modules
  ignore: [],
  // we only want to compile this package - each package will look after compiling itself
  // FIXME: not sure why this sometimes breaks
  // only: [(file) => {
  //   console.log(file, file.startsWith("${path.resolve(
    getSourceDirectory(),
  )}"), "${path.resolve(getSourceDirectory())}");
  //   return file.startsWith("${path.resolve(getSourceDirectory())}");
  // }],
  presets: [['@jameslnewell/babel-preset', {modules: false}]],
});
/*
  We're relying on the assumption that each of our pacakges are using named exports
*/
module.exports = require("../src/${relativeFile}");
// FIXME: not sure why we can't stop the hook
// register.revert();
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
