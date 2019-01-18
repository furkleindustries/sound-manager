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

  files: [
    'src/**/*.js',
    'src/**/*.ts',
    'tests/setup.js',
  ],

  tests: [
    'tests/**/*.test.ts',
  ],

  env: {
    type: 'node',
    runner: 'node'
  },

  testFramework: 'jest',
});
