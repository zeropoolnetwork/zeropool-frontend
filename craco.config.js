const { addBeforeLoader, loaderByName } = require('@craco/craco')
const { ProvidePlugin, DefinePlugin } = require('webpack')
const path = require('path')
const Dotenv  = require('dotenv-webpack')

module.exports = {
  ignoreWarnings: [
    {
      message: /source-map-loader/, // not works
    },
  ],
  devServer: {
    client: {
      overlay: false,
      logging: 'error',
    },
  },
  stats: {
    modules: false,
    assets: false,
  },
  webpack: {
    configure: {
      resolve: {
        fallback: {
          'http': require.resolve('stream-http'),
          'https': require.resolve('https-browserify'),
          'crypto': require.resolve('crypto-browserify'),
          'os': require.resolve('os-browserify/browser'),
          'path': require.resolve('path-browserify'),
          'assert': require.resolve('assert'),
          'constants': require.resolve('constants-browserify'),
          'fs': false,
        },
        alias: {
          process: 'process/browser.js',
          stream: 'stream-browserify',
        },
        modules: [__dirname, path.join(__dirname, '../src'), 'node_modules'],
      },
      module: {
        rules: [{
          test: /\.wasm$/,
          type: 'asset/resource',
          },
          {
            test: /\.bin/,
            type: 'asset/resource',
          },
          { 
            test: /\.js$/, 
            type: 'javascript/auto'
          },
          {
            resourceQuery: /asset/,
            type: 'asset/resource',
          },
        ],
      },
      experiments: {
        asyncWebAssembly: true,
      },
    },
    plugins: {
      add: [
        new Dotenv(),
      ]
    }
  }
};
