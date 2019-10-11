const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
const publicPathObj = require('../config/publicPath');

module.exports = function(env) {
	const webpackConfig = require('../webpack/webpack.prod')(
		publicPathObj[env]
	);
	const spinner = ora('\nnow building...');

	spinner.start();

	webpack(webpackConfig, function(err, stats) {
		spinner.stop();
		if (err) throw err;
		process.stdout.write(
			stats.toString({
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false
			}) + '\n\n'
		);

		console.log(chalk.green('  build done.\n'));
		console.log(chalk.cyan(`  build info:\n`));
		console.log(chalk.cyan(`    build env: ${env} \n`));
		console.log(chalk.cyan(`    build publicPath: ${publicPathObj[env]} \n`));

		console.log(
			chalk.red(
				'  please notice the information above, if you want to publish online, env should be: "prod"\n'
			)
		);
	});
};
