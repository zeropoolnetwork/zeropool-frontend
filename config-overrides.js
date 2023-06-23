const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

// const WebpackVersionFilePlugin = require('webpack-version-file-plugin')
// const execa = require('execa')

// const gitHash = execa.sync('git', ['rev-parse', '--short', 'HEAD']).stdout
// const gitNumCommits = Number(execa.sync('git', ['rev-list', 'HEAD', '--count']).stdout)
// const gitDirty = execa.sync('git', ['status', '-s', '-uall']).stdout.length > 0

module.exports = {
  webpack: function override(config, env) {
    config.mode = 'development'
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
    }

    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      tty: false,
      url: require.resolve('url'),
      assert: require.resolve('assert'),
      constants: require.resolve('constants-browserify'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
    }

    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process',
      }),
      new CopyPlugin({
        patterns: [{ from: 'src/env.js' }, { from: '*', context: 'workers' }],
      }),
      new CompressionPlugin({ exclude: 'env.js' }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        // Manual cache busting for external assets
        'process.env.CACHE_BUST': JSON.stringify(new Date().getTime()),
      }),
      /*
      new WebpackVersionFilePlugin({
        packageFile: path.join(__dirname, 'package.json'),
        template: path.join(__dirname, 'version.ejs'),
        outputFile: path.join('build/ts/', 'version.json'),
        extras: {
          'githash': gitHash,
          'gitNumCommits': gitNumCommits,
          'timestamp': Date.now(),
          'dirty': gitDirty
        }
      }),
      */
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
      const config = configFunction(proxy, allowedHost)

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

      config.static = './static'
      // config.compress = true
      // config.port = 3000
      // config.hot = true
      // config.writeToDisk = true

      // Return your customised Webpack Development Server config.
      return config
    }
  },
}
