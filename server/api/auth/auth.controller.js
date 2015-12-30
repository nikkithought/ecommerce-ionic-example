'use strict';

var passport = require('passport');

var auth = require('./auth.model.js');
var config = require('../../config/environment');
var db = require('../../sqldb');


// Passport Configuration
require('./../../config/passport').setup(db.User, config);

exports.login = function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.status(401).json(error);
    if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});

    var token = auth.signToken(user.id, user.role);
    res.json({token: token});
  })(req, res, next)
};

function handleError(res, error) {
  return res.status(500).json({code:500,message:'internal server error',description:JSON.stringify(error)} );
}
