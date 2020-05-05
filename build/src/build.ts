import * as childProcess from 'child_process';
import * as path from 'path';
import * as util from 'util';
import {rollup, RollupOptions, OutputOptions} from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import {
  emptyBuildDirectory,
  getBuildTypesDirectory,
  getPackageManifest,
  getBuildBundleFile,
} from './utils';

const exec = util.promisify(childProcess.exec);

async function generateTypings() {
  const {stdout, stderr} = await exec(
    `tsc --declaration --emitDeclarationOnly --declarationDir ${getBuildTypesDirectory()}`,
  );
  if (stdout !== '' || stderr !== '') {
    console.log(stdout);
    console.error(stderr);
  }
}

async function generateBundles() {
  const packageJSON = await getPackageManifest();
  const dependencies = Object.keys({
    ...packageJSON.dependencies,
    ...packageJSON.peerDependencies,
    ...packageJSON.optionalDependencies,
  });

  const extensions = ['.ts', '.tsx', '.js', '.jsx'];

  const inputOptions: RollupOptions = {
    input: path.resolve('src/index'),
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
    file: getBuildBundleFile('cjs', packageJSON),
    sourcemap: true,
  };
  const esmOutputOptions: OutputOptions = {
    format: 'esm',
    file: getBuildBundleFile('esm', packageJSON),
    sourcemap: true,
  };

  await Promise.all([
    bundle.write(cjsOutputOptions),
    bundle.write(esmOutputOptions),
  ]);
}

(async () => {
  const pkg = await getPackageManifest();
  try {
    await emptyBuildDirectory();
    await Promise.all([generateTypings(), generateBundles()]);
    console.log(`✅ Finished building "${pkg.name}"`);
  } catch (error) {
    console.error(`❌ Error building "${pkg.name}"`);
    console.error(error);
    process.exitCode = -1;
  }
})();
