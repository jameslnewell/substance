import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import {rollup, RollupOptions, OutputOptions} from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import {
  emptyBuildDirectory,
  getSourceDirectory,
  getBuildTypesDirectory,
  getPackageManifest,
  getEntryFile,
  getBuildBundleFile,
  getBuildBundleTypeFile,
} from './utils';

const exec = util.promisify(childProcess.exec);
const writeFile = util.promisify(fs.writeFile);

async function generateTypings() {
  // TODO: ignore tests and stories
  const {stdout, stderr} = await exec(
    `tsc --declaration --emitDeclarationOnly --declarationDir ${getBuildTypesDirectory()} --project tsconfig.json`,
  );
  if (stdout !== '' || stderr !== '') {
    console.log(stdout);
    console.error(stderr);
  }
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
export * from "./types/${relativeFile}";
`;
}

async function generateBundles(manifest: any) {
  const dependencies = Object.keys({
    ...manifest.dependencies,
    ...manifest.peerDependencies,
    ...manifest.optionalDependencies,
  });

  const extensions = ['.ts', '.tsx', '.js', '.jsx'];

  const inputOptions: RollupOptions = {
    input: getEntryFile(manifest),
    external: dependencies,
    plugins: [
      resolve({
        extensions,
      }),
      babel({
        babelHelpers: 'runtime',
        babelrc: false,
        configFile: false,
        extensions,
        exclude: ['node_modules'],
        presets: ['@jameslnewell/babel-preset'],
        plugins: [['@babel/plugin-transform-runtime', {useESModules: true}]],
      }),
    ],
  };

  const bundle = await rollup(inputOptions);

  const cjsOutputOptions: OutputOptions = {
    format: 'cjs',
    file: getBuildBundleFile('cjs', manifest),
    sourcemap: true,
  };
  const esmOutputOptions: OutputOptions = {
    format: 'esm',
    file: getBuildBundleFile('esm', manifest),
    sourcemap: true,
  };

  await Promise.all([
    bundle.write(cjsOutputOptions),
    writeFile(
      getBuildBundleTypeFile('cjs', manifest),
      getBuildBundleTypeFileContent(manifest),
    ),
    bundle.write(esmOutputOptions),
    writeFile(
      getBuildBundleTypeFile('esm', manifest),
      getBuildBundleTypeFileContent(manifest),
    ),
  ]);
}

(async () => {
  const manifest = await getPackageManifest();
  try {
    await emptyBuildDirectory();
    await Promise.all([generateTypings(), generateBundles(manifest)]);
    console.log(`✅ Finished building "${manifest.name}"`);
  } catch (error) {
    console.error(`❌ Error building "${manifest.name}"`);
    console.error(error);
    process.exitCode = -1;
  }
})();
