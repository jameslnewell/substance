import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import del from 'del';
import mkdirp from 'mkdirp';

const read = util.promisify(fs.readFile);

export function getProjectDirectory() {
  return path.relative(process.cwd(), process.cwd()) || '.';
}

export function getSourceDirectory() {
  return path.join(getProjectDirectory(), 'src');
}

export function getBuildDirectory() {
  return path.join(getProjectDirectory(), 'dist');
}

export function getBuildTypesDirectory() {
  return path.join(getBuildDirectory(), 'types');
}

export function getEntryFile(manifest: any) {
  if (manifest.source) {
    return manifest.source;
  }
  return path.join(getProjectDirectory(), 'src/index.ts');
}

export function getBuildBundleFile(
  format: 'cjs' | 'esm',
  manifest: any,
): string {
  const defaultName = manifest.name.replace(/^([^/]+)\//, ``);
  const defaultFile = `${getBuildDirectory()}/${defaultName}.${format}.js`;
  switch (format) {
    case 'cjs':
      return manifest.main || defaultFile;
    case 'esm':
      return manifest.module || defaultFile;
  }
}

export function getBuildBundleTypeFile(format: 'cjs' | 'esm', manifest: any) {
  const buildBundleFile = getBuildBundleFile(format, manifest);
  return `${path.dirname(buildBundleFile)}/${path.basename(
    buildBundleFile,
    '.js',
  )}.d.ts`;
}

export async function emptyBuildDirectory() {
  await del([getBuildDirectory()]);
  await mkdirp(getBuildDirectory());
}

export async function getPackageManifest() {
  const content = await read(path.join(getProjectDirectory(), 'package.json'));
  const json = JSON.parse(content.toString());
  return json;
}
