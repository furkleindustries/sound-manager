module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [
    '**/tests/**/*.test.{j,t}s?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).{j,t}s?(x)',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  moduleDirectories: [
    'node_modules',
  ],
};
