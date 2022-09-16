// Currently not used
const path = require('path');

module.exports = {
  entry: {
    workerSt: './node_modules/zeropool-client-js/lib/workerSt.js',
    workerMt: './node_modules/zeropool-client-js/lib/workerMt.js',
  },
  output: {
    path: path.join(process.cwd(), 'build-workers'),
    filename: '[name].js',
    assetModuleFilename: '[name][hash][ext]',
    publicPath: './',
  },
  target: 'webworker',
  mode: 'production',
  resolve: {
    extensions: ['.js'],
  },
};
