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
    process: 'process/browser.js',
  },

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process',
    }),
    new Dotenv(),

    // new webpack.DefinePlugin(process.env)
]) 

  return config;
}