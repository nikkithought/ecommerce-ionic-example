/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment/index');



// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;

// Creating Tables or Initiating Connections
var db = require('./sqldb/index')
db
    .sequelize
    // Forcing to create or recreate tables
    .sync({ force: false})
    .then(function(err) {
        console.log("DB Init");
        // Connect to databas
        // Populate DB with sample data
        //if(config.seedDB) { require('./config/seed'); }
    }).catch(function(err){
        console.log("Error while Database sync: ",err);
    });

