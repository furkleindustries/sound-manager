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

const cjsConfig = {
  ...base,

  target: 'node',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist', 'cjs'),
    libraryTarget: 'commonjs',
  },
};

const webConfig = {
  ...base,

  target: 'web',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist', 'browser'),
    library: 'soundManager',
    libraryTarget: 'window',
  },
};

module.exports = [
  cjsConfig,
  webConfig,
];
