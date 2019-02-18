const path = require('path');

const mode = process.env.NODE_ENV === 'development' ?
  'development' :
  'production';

const base = {
};

const config = {
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
  
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist', 'browser'),
    library: 'soundManager',
    libraryTarget: 'window',
  },

  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
    ],
  },
};

module.exports = [
  config,
];
