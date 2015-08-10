
var util = require('util'),
	chalk = require('chalk'),
	dateformat = require('dateformat');

module.exports = function() {
	process.stdout.write(util.format('[%s] ', chalk.grey(dateformat(new Date(), 'HH:MM:ss'))));

	console.log.apply(console, arguments);
};