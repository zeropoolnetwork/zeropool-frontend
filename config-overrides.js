const webpack = require('webpack');
const Dotenv  = require('dotenv-webpack')
const path = require('path')

module.exports = function override(config, env) {
  config.resolve.fallback = {
    'assert': require.resolve('assert'),
    'constants': require.resolve('constants-browserify'),
    'crypto': require.resolve('crypto-browserify'),
    'fs': false,
    'http': require.resolve('stream-http'),
    'https': require.resolve('https-browserify'),
    'os': require.resolve('os-browserify/browser'),
    'path': require.resolve('path-browserify'),
    'stream': require.resolve('stream-browserify'),
  },

  config.resolve.alias = {
    ...config.resolve.alias,
    process: 'process/browser.js',
    stream: 'stream-browserify',
  },

  config.module.rules = [
    ...config.module.rules,
  {
    test: /\.js$/,
    enforce: 'pre',
    use: ['source-map-loader'],
  }, {
    test: /\.wasm$/,
    type: 'asset/resource',
  }, {
    test: /\.bin/,
    type: 'asset/resource',
  }, {
    resourceQuery: /asset/,
    type: 'asset/resource',
}]
    

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process',
    }),
    // new Dotenv(),

    new webpack.EnvironmentPlugin({
      NETWORK: null,
      CONTRACT_ADDRESS: null,
      TOKEN_ADDRESS: null,
      RELAYER_URL: null,
      RPC_URL: null,
    }),
  ]) 

  return config;
}