// Currently not used
const path = require('path');

module.exports = {
  entry: {
    workerSt: './node_modules/zeropool-client-js/lib/workerSt.js',
    workerMt: './node_modules/zeropool-client-js/lib/workerMt.js',
  },
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: '[name].js',
    assetModuleFilename: '[name][ext]',
    publicPath: './',
  },
  target: 'webworker',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: 'ts-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
