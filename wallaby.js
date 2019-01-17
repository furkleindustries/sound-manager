module.exports = (wallaby) => ({
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
