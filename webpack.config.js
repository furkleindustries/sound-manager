const path = require('path');

const mode = process.env.NODE_ENV === 'development' ?
  'development' :
  'production';

module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  mode,

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'soundManager',
    libraryTarget: 'commonjs',
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
