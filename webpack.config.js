const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = (_, { mode }) => {
  const configs = {
    entry: './app/App.js',
    output: {
      path: __dirname,
      filename: 'app.min.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['env', 'react'],
            plugins: [
              'react-html-attrs',
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }, {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: mode === 'development'}
            }, {
              loader: 'css-loader',
              options: { url: false }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        '~': resolve('app'),
        'db$': resolve('app/utils/db'),
        'gallery$': resolve('app/utils/gallery/Gallery'),
        'material-ui': '@material-ui/core',
        'fetch': 'whatwg-fetch'
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'app.min.css'
      })
    ],
    optimization: {
      minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
    },
  };
  if(mode === 'production')
    configs.externals = {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'material-ui': 'MaterialUI'
    };
  return configs;
};
