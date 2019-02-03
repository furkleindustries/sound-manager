const path = require('path');

const mode = process.env.NODE_ENV === 'development' ?
  'development' :
  'production';

module.exports = {
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
