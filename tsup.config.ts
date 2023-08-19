import type { Options } from 'tsup';

export const tsup: Options = {
  outDir: 'dist',
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: true,
  entry: ['index.ts'],
  target: 'es2021',
};
