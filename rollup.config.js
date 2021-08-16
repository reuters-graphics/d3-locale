import externals from 'rollup-plugin-node-externals';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';

const plugins = [
  resolve({ preferBuiltins: true, modulesOnly: true }),
  json(),
  externals(),
];

const external = [
  'd3-format',
  'd3-time-format',
];

export default [{
  input: 'lib/index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
  },
  external,
  plugins,
}, {
  input: 'lib/index.js',
  output: {
    file: 'dist/index.cjs',
    format: 'cjs',
  },
  external,
  plugins,
}];
