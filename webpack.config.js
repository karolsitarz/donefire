const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PUBLIC_PATH = 'https://karolsitarz.github.io/donefire/';

module.exports = (env, argv) => [
  {
    name: 'client',
    target: 'web',
    entry: './src/index.js',
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      }]
    },
    devServer: {
      contentBase: './dist',
      hot: true,
      open: true,
      host: require('ip').address(),
      port: '1234'
    },
    plugins: [
      argv.mode === 'production'
        ? undefined
        : new webpack.NamedModulesPlugin(),

      argv.mode === 'production'
        ? undefined
        : new webpack.HotModuleReplacementPlugin(),

      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),

      new CleanWebpackPlugin(['dist/bundle.*.js']),

      argv.mode === 'development'
        ? undefined
        : new SWPrecacheWebpackPlugin(
          {
            cacheId: 'donefire',
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            minify: true,
            navigateFallback: PUBLIC_PATH + 'index.html',
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
          }
        )
    ].filter(Boolean),
    node: {
      __dirname: false
    },
    mode: 'development',
    performance: {
      hints: argv.mode === 'production' ? 'warning' : false
    },
    devtool: argv.mode === 'production' ? 'none' : 'cheap-module-eval-source-map',
    output: {
      pathinfo: false,
      path: path.join(__dirname, './dist'),
      filename: 'bundle.[chunkhash].js',
      publicPath: PUBLIC_PATH
    }
  }];
