const path = require('path');

const mode = process.env.NODE_ENV === 'development' ?
  'development' :
  'production';

const base = {
  mode,

  entry: './src/index.ts',
  devtool: 'source-map',

  plugins: [],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
    ],
  },
};

const browserConfig = {
  ...base,
  output: {
    filename: 'browser.js',
    path: path.join(__dirname, 'dist'),
    library: 'soundManager',
    libraryTarget: 'commonjs',
  },
};

const nodeConfig = {
  ...base,
  output: {
    filename: 'node.js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },
};

module.exports = [
  browserConfig,
  nodeConfig,
];
