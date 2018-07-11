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
    }
  };
  if(mode === 'production')
    configs.externals = {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'material-ui': 'window["material-ui"]',
      'fetch': 'fetch'
    };
  else {
    configs.resolve = {
      alias: {
        'material-ui': '@material-ui/core',
        'fetch': 'whatwg-fetch'
      }
    };
    configs.plugins = [
      new (require('webpack')).ProvidePlugin({
        'React': 'react'
      })
    ];
  }
  return configs;
};
