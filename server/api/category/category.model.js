'use strict'

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
      id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      name: DataTypes.STRING(60)
    }
  );

  return Category;
};

