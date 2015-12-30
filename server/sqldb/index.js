/**
 * Sequelize initialization module
 */

'use strict';

var path = require('path');
var config = require('../config/environment');
var Sequelize = require('sequelize');

var db = {
  Sequelize:{},
  sequelize: new Sequelize(config.databaseURL)
};

// Insert models below
db.Category = db.sequelize.import('../api/category/category.model');
db.Subcategory = db.sequelize.import('../api/subcategory/subcategory.model');
db.Product = db.sequelize.import('../api/product/product.model');

db.Subcategory.belongsTo(db.Category, {foreignKey: 'fk_category'});
db.Product.belongsTo(db.Subcategory, {foreignKey: 'fk_subcategory'});

module.exports = db;
