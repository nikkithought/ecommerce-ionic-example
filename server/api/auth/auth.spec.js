'use strict';

var should = require('should');
var app = require('../../server/app');
var request = require('supertest');

describe('POST /v1/auth/login', function() {
    it('should respond with JSON Object', function(done) {
        request(app)
            .post('/v1/auth/login')
            .send({email:'admin@admin.com',password:'admin'})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                done();
            });
    });
});





