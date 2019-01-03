const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  
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
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'soundManager',
    libraryTarget: 'umd',
  },
};
