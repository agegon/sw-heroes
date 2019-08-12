const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: false,
  mode: 'development',
  entry: {
    main: [
      'core-js',                    // include core-js library
      'normalize.css',              // include normalize.css
      './src/app/index.js',
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    port: 7070,
    hot: true,
    overlay: true,
    contentBase: ['./src', './public'],
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: { 
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]' },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[path][name].[ext]' },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [ 'file-loader' ]
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { devServer: true }
    }),
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'img' },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'SW Heroes',
    }),
    new MiniCSSExtractPlugin({ 
      filename: '[name].css'
    })
  ],
};
