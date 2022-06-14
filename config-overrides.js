const webpack = require('webpack');

module.exports = function override(config, env) {
  config.output.environment = {
    arrowFunction: true,
    bigIntLiteral: false,
    const: true,
    destructuring: true,
    dynamicImport: false,
    forOf: true,
    module: false,
    optionalChaining: true,
    templateLiteral: true,
  },

  config.resolve.fallback = {
    'fs': false,
    'net': false,
    'tls': false,
    'tty': false,
    'assert': require.resolve('assert'),
    'constants': require.resolve('constants-browserify'),
    'crypto': require.resolve('crypto-browserify'),
    'http': require.resolve('stream-http'),
    'https': require.resolve('https-browserify'),
    'os': require.resolve('os-browserify/browser'),
    'path': require.resolve('path-browserify'),
    'stream': require.resolve('stream-browserify'),
    'zlib': require.resolve('browserify-zlib'),
  }

  config.resolve.alias = {
    ...config.resolve.alias,
    process: 'process/browser.js',
  }

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
    test: /\.bin$/,
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
  ]) 

  config.ignoreWarnings = [
    {
      message: /Failed to parse source map/,
    },
  ]
  
  config.devServer = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  }

  // console.log(JSON.stringify(config))
  return config
}