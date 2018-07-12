const { resolve } = require('path');

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
            plugins: ['react-html-attrs', 'transform-class-properties']
          }
        }, {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader?url=false&minimize']
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
    }
  };
  if(mode === 'production')
    configs.externals = {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'material-ui': 'window["material-ui"]',
      'fetch': 'fetch'
    };
  else
    configs.plugins = [
      new (require('webpack')).ProvidePlugin({
        'React': 'react'
      })
    ];
  return configs;
};
