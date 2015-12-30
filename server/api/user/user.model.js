'use strict'

var crypto = require('crypto');
var validatePresenceOf = function(value) {
  return value && value.length;
};



module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
      id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      provider: DataTypes.STRING(60),
      name: DataTypes.STRING(60),
      email: DataTypes.STRING(60),
      hashedPassword: DataTypes.STRING(255),
      salt: DataTypes.STRING(60),
      role: DataTypes.STRING(60)
    },{
      tableName: 'users',
      hooks: {
        /**
         * Pre-save hook
         */
        beforeCreate :  function(user) {
          if (!user.isNew) return ;

          if (!validatePresenceOf(user.hashedPassword))
            return new Error('Invalid password');
          else
            return;
        }
      },
      getterMethods: {
        profile: function(){
          return {
            '_id': this._id,
            'role': this.role
          }
        },
        password: function(){
          return this.password
        }
      },
      setterMethods:{
        password: function(password){
          this._password = password;
          this.salt = this.makeSalt();
          this.hashedPassword = this.encryptPassword(password);
        }
      },
      instanceMethods: {
        /**
         * Authenticate - check if the passwords are the same
         *
         * @param {String} plainText
         * @return {Boolean}
         * @api public
         */
        authenticate: function(plainText) {
          return this.encryptPassword(plainText) === this.hashedPassword;
        },
        /**
         * Make salt
         *
         * @return {String}
         * @api public
         */
        makeSalt: function() {
          return crypto.randomBytes(16).toString('base64');
        },
        /**
         * Encrypt password
         *
         * @param {String} password
         * @return {String}
         * @api public
         */
        encryptPassword: function(password) {
          if (!password || !this.salt) return '';
          var salt = new Buffer(this.salt, 'base64');
          return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
        }
      }
    }
  );

  return User;
};

