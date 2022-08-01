const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
        // We support configuring the sockjs pathname during development.
        // These settings let a developer run multiple simultaneous projects.
        // They are used as the connection `hostname`, `pathname` and `port`
        // in webpackHotDevClient. They are used as the `sockHost`, `sockPath`
        // and `sockPort` options in webpack-dev-server.
        WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
        // Whether or not react-refresh is enabled.
        // It is defined here so it is available in the webpackHotDevClient.
        FAST_REFRESH: process.env.FAST_REFRESH !== 'false',
      }
    );
  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

const env = getClientEnvironment(publicUrlOrPath.slice(0, -1));

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle-[hash].js',
    publicPath: './',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
    modules: ['node_modules', resolveApp('node_modules'), "./src"],
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10000,
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/env.js' },
      ],
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process'
    }),
  ],
  ignoreWarnings: [/Failed to parse source map/],
};
