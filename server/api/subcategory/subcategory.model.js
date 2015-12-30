'use strict'

module.exports = function(sequelize, DataTypes) {
  var Subcategory = sequelize.define('Subcategory', {
      id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      name: DataTypes.STRING(60),

    }
  );

  return Subcategory;
};

