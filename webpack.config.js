const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const base = {
  entry: './src/index.tsx',

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },

  optimization: {
    // This should separate the vendor modules (node_modules) from the main app bundle
    splitChunks: {
      chunks: 'all',
    },
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: false,

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        // postcss-loader is convinient in making sure we can target browser versions
        // appropriately, and will add in all the nessesary modifiers per browser
        // postcss-loader uses some of it's own modules plus cssnano
        // everything can be configured in postcss.config.js located in the root of this project
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        // awesome-typescript-loader was selected for performance gains
        // It is maintained and developed by the webpack team
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    // Cleans the dist folder after every build
    // Convinient for webpack-dev-server watch bundling
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      minify: isProduction,
      hash: isProduction,
      cache: !isProduction,
      metadata: { baseUrl: './' },
    })
  ]
};

const dev = {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  output: {
    filename: '[name].[hash].js',
  },
  resolve: {
    alias: {
      // We override the react-dom module with a built in hot reload module attached
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
    host: 'localhost',
    port: process.env.PORT || 3000,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const prod = {
  mode: 'production',
  optimization: {
    minimizer: [
      // TerserJSPlugin is the default webpack minimizer for JS, we just have to include it
      // as we are specifying a different CSS minimizer
      new TerserJSPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ]
  },
};

module.exports = isProduction ? webpackMerge(base, prod) : webpackMerge(base, dev);
