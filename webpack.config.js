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
					presets: ['env', 'react'],
					plugins: ['react-html-attrs']
				}
			}, {
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'material-ui': 'window["material-ui"]',
		'fetch': 'fetch'
	}
};
