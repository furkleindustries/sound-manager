const path = require('path');

const mode = process.env.NODE_ENV === 'development' ?
  'development' :
  'production';

const base = {
  mode,

  entry: './src/index.ts',
  devtool: 'source-map',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'soundManager',
  },

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
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist', 'browser'),
    library: 'soundManager',
    libraryTarget: 'commonjs',
  },
};

const nodeConfig = {
  ...base,
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist', 'node'),
    libraryTarget: 'esnext',
  },
};

module.exports = [
  browserConfig,
  nodeConfig,
];
