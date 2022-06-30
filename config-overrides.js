const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')

module.exports = {
  webpack: function override(config, env) {
    console.log(`Modifying webpack config in ${process.env.NODE_ENV} mode`)

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
      process: 'process/browser',
      stream: 'stream-browserify',
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
      new CopyPlugin({
        patterns: [
          { from: 'src/env.js' },
        ],
      }),
      new CompressionPlugin({ exclude: 'env.js' }),
    ])

    config.ignoreWarnings = [
      {
        message: /Failed to parse source map/,
      },
    ]

    return config
  },
  devServer: function (configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function (proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      // Change the https certificate options to match your certificate, using the .env file to
      // set the file paths & passphrase.
      // const fs = require('fs');
      // config.https = {
      //   key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
      //   cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
      //   ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
      //   passphrase: process.env.REACT_HTTPS_PASS
      // }

      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      }

      config.devMiddleware.mimeTypes = {
        ...config.devMiddleware.mimeTypes,
        svg: 'image/svg+xml',
      },

      config.static = './static'
      // config.compress = true
      // config.port = 3000
      // config.hot = true
      // config.writeToDisk = true

      // Return your customised Webpack Development Server config.
      return config;
    };
  },
}
