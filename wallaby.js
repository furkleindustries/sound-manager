const babelCore = require('babel-core');

module.exports = (wallaby) => ({
  preprocessors: {
    '**/*.js?(x)': (file) => (
      babelCore.transform(
        file.content,
        {
          sourceMap: true,
          filename: file.path,
          presets: [ 'babel-preset-jest' ],
        },
      )
    ),
  },

  compilers: {
    '**/*.ts?(x)': wallaby.compilers.typeScript({ module: 'commonjs' }),
  },

  files: [
    'src/**/*.js',
    'src/**/*.ts',
    {
      pattern: 'tests/setup.js',
      instrument: false,
    },
  ],

  tests: [
    'tests/**/*.test.ts',
  ],

  env: {
    type: 'node',
    runner: 'node'
  },

  testFramework: 'jest',

  hints: {
    ignoreCoverage: /istanbul ignore next/,
    ignoreCoverageForFile: /istanbul ignore file/,
  },
});
