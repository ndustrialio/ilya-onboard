const webpack = require('webpack');
const path = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Paths = {
  DIST: path.join(__dirname, 'dist'),
  ENTRY: path.join(__dirname, 'src', 'App.js'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules')
};

module.exports = {
  entry: {
    'static/js/bundle.js': Paths.ENTRY
  },
  output: {
    path: Paths.DIST,
    filename: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          cacheDirectory: 'babel_cache',
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            { loader: 'postcss-loader', options: { sourceMap: true } },
            'resolve-url-loader',
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.(gif|png|jpg|svg|woff|woff2|ttf|eot)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif)$/i }),
    new ExtractTextPlugin('./static/styles/styles.css'),
    new HtmlWebpackPlugin({
      template: '!html-loader!./src/views/index.ejs',
      filename: 'src/views/index.ejs'
    })
  ]
};
