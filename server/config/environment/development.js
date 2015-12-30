'use strict';

// Development specific configuration
// ==================================
module.exports = {
    env:'development',
    port: 8000,
    //databaseURL: process.env.DATABASE_URL || 'postgres://postgres:admin@localhost/CMS',
    databaseURL: process.env.DATABASE_URL || 'mysql://root:@localhost/ecommerce',
    cdnurl:"", // "" is relative url /
    secret: 'secretforjwt',

    apiVersion: 'v1',
    publicKeyPath:'public.key',

    //https://www.npmjs.com/package/compression#level 0-9
    compressionLevel:0,
    hpack: {
        do:true,
        index: 'data'
    },
    lruCachePlusRedis: {
        flag: false,
        lruCache: {
            length: function (n) {
                return n * 2
            }, displose: function (key, n) {
                n.close()
            }, maxAge: 1000 * 60 * 60
        },
        redis: {
            port: 6379,
            servers: '192.168.220.233'
        },
        prefix: "ha_dexv_"
    },
    service_discovery:{
        flag: true,
        host: "192.168.222.202",
        port:'4001'
    },
    statsd :{
        host: "192.168.222.202",
        port: 8125
    }

};

