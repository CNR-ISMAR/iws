const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');



module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== 'production';
  
  return ({
    mode: isDevelopment ? 'development' : 'production',
    target: 'web',
    entry: {
      seastorm: './src/seastorm/index.js',
    },
    output: {
      path: path.resolve('./static/frontend/'),
      filename: '[name]-[fullhash].js',
      publicPath: isDevelopment ? 'http://localhost:9091/' : '/static/frontend/',
    },
    devServer: {
      static: {
        directory: path.join(path.resolve(__dirname, '.'), 'static', 'frontend'),
      },
      compress: true,
      port: 9091,
      hot: true,
      allowedHosts: 'all',
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    },
    plugins: [
      !isDevelopment && new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new CleanWebpackPlugin(),
      new BundleTracker({
        path: __dirname,
        filename: './webpack-stats.json',
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              plugins: [isDevelopment && 'react-refresh/babel'].filter(Boolean),
            },
          }],
        },
        {
          test: /\.(scss)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  })
}
