'use strict'

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
      id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      name: DataTypes.STRING(60),
      price: DataTypes.STRING(60)
    }
  );

  return Product;
};

