/**
 * Main application routes
 */

'use strict';

var config = require('./config/environment/index');

module.exports = function (app) {
	// Insert routes below
	app.use('/api/auth', require('./api/auth/index'));
	app.use('/api/users', require('./api/user/index'));
	app.use('/api/categories', require('./api/category/index'));
	app.use('/api/subcategories', require('./api/subcategory/index'));
	app.use('/api/products', require('./api/product/index'));
};
