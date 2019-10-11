'use strict';

process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
	throw err;
});

module.exports = require('./webpack.base.js');
