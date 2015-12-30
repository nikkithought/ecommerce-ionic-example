'use strict';

// Test specific configuration
// ===========================
module.exports = {
    hapi: {
        host:'localhost',
        port: 9000
    },
    version: "/api/v1",
    databaseURL: process.env.DATABASE_URL || "postgres://postgres:admin@localhost/HotelierSolutionDev",
    array2jsonCompressionFlag: true,
    services: {
        debug: {
            port: 20201
        },
        property:{
            port: 20202
        }
    }
};
