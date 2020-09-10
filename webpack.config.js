const webpack = require('webpack');
const path = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientConfig = require('./config');
const port = process.env.PORT || 5000;

const Paths = {
  DIST: path.join(__dirname, 'dist'),
  ENTRY: path.join(__dirname, 'src', 'App.js'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules')
};

function getDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    return 'source-map'; // enables source map
  }

  return false;
}

module.exports = {
  entry: {
    'static/js/bundle.js': ['whatwg-fetch', Paths.ENTRY]
  },
  output: {
    path: Paths.DIST,
    filename: '[name]'
  },
  devtool: getDevTool(),
  devServer: {
    contentBase: Paths.DIST,
    hot: true,
    inline: true,
    port,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: ['react-hot-loader/webpack', 'babel-loader']
      },
      {
        test: /\.xml$/,
        use: 'raw-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: { sourceMap: true } },
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif)$/i }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/views/index.ejs',
      config: clientConfig
    })
  ]
};
