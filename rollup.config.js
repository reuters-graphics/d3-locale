import json from '@rollup/plugin-json';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

const config = [{
  input: 'lib/index.js',
  external: Object.keys(pkg.dependencies || {}).filter(key => /^d3-/.test(key)),
  output: {
    file: 'dist/d3-locale.min.js',
    name: 'd3',
    format: 'umd',
    extend: true,
    banner: `// ${pkg.name} v${pkg.version} Copyright ${(new Date()).getFullYear()} ${pkg.author}`,
  },
  plugins: [
    terser(),
    json(),
  ],
}, {
  input: 'lib/index.js',
  external: Object.keys(pkg.dependencies || {}).filter(key => /^d3-/.test(key)),
  output: {
    file: 'dist/index.js',
    format: 'es',
    banner: `// ${pkg.name} v${pkg.version} Copyright ${(new Date()).getFullYear()} ${pkg.author}`,
  },
  plugins: [
    json(),
  ],
}];

export default config;
