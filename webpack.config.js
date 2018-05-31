var webpack = require('webpack');

module.exports = {
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
					presets: ['env', 'react']
				}
			}
		]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'material-ui': 'window["material-ui"]'
	}
};
