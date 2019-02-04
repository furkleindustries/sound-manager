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
        exclude: /node_modules/,
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
    filename: 'browser-script.js',
    path: path.join(__dirname, 'dist'),
    library: 'soundManager',
    libraryTarget: 'window',
  },
};

const nodeConfig = {
  ...base,
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },
};

module.exports = [
  browserConfig,
  nodeConfig,
];
