const fs = require('fs'), file = 'app.min.js';
let ctr, put = string => {
	ctr = 0;
	return () => {
		ctr++;
		return string;
	};
};

fs.readFile(file, 'utf8', (_, js) => {
	js = js.replace(/throw new .*?Error\(".*?".*?\)/g, put('throw null'));
	console.log('Removed', ctr, 'Error Throws');
	js = 'var z = React.createElement;' + js.replace(/React.createElement/g, put('z'));
	console.log('Replaced', ctr, 'React.createElement');
  fs.writeFile(file, js, 'utf8', () => {});
});