const path = require('path');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const Dotenv = require('dotenv-webpack');

module.exports = {
  target: 'web',
  entry: {
    index: './src/index.js',
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/dist/',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              require('@babel/plugin-proposal-class-properties'),
              require('@babel/plugin-proposal-object-rest-spread'),
              require('@babel/plugin-syntax-dynamic-import'),
              require('react-loadable/babel'),
              require('@babel/plugin-transform-runtime'),
            ],
          },
        },
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ]
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ]
      }
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
        default: {
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new ReactLoadableSSRAddon({
      filename: 'react-loadable-ssr-addon.json',
    }),
    new Dotenv()
  ],
};
