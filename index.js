var Tangram = require('tangramjs'),
	log = require('./lib/log'),
	Liftoff = require('liftoff'),
	interpret = require('interpret'),
	v8flags = require('v8flags'),
	chalk = require('chalk'),
	argv = require('minimist')(process.argv.slice(2));

process.env.INIT_CWD = process.cwd();

var cli = new Liftoff({
	name: 'tangram',
	extensions: interpret.jsVariants,
	v8flags: v8flags
});

function invoke(env) {
	if (!argv._ || argv._.length <= 0) {
		exit(9);
	}

	var tangram = new Tangram();

	tangram.on('ready', function(options) {
		log(chalk.blue.bold('Ready...'));
	});

	tangram.on('end', function() {
		log(chalk.blue.bold('Done without errors.'));

		exit(0);
	});

	tangram.solve(argv._, argv);
}

module.exports = function() {
	cli.launch({}, invoke);
};

function exit(code) {
	if (process.platform === 'win32' && process.stdout.bufferSize) {
		process.stdout.once('drain', function() {
			process.exit(code);
		});

		return;
	}

	process.exit(code);
}