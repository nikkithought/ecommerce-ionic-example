'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var os = require('os');
var gulp = require('gulp');
var open = require('gulp-open');
var copy = require('gulp-copy');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var config =  require('./server/config/environment')
var env = require('gulp-env');
var clean = require('gulp-rimraf');

gulp.task('clean', function () {
    return gulp.src(['!.gitignore','!.git/**/*','dist/*'])
        .pipe(clean());
});

gulp.task('build', ['clean'],function () {
    return gulp.src(['!node_modules/**/*','!dist/**/*','**/*'])
        .pipe(copy("dist"));
})

gulp.task('lint', function () {
    gulp.src(['api/**/*','config/**/*','route.js','app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})

gulp.task('run', function () {
    nodemon({ script: 'server/app.js'
        , ext: 'html js'
        , ignore: [] //'ignored.js'
        , tasks: [] })
        .on('restart', function () {
            console.log('restarted!')
        })
})


// Run App

gulp.task('open', function(){
    gulp.src('./index.html')
        .pipe(open());
});

gulp.task('test', ['set-env'], function () {
    return gulp.src('./api/**/*.spec.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());
});

gulp.task('set-env',function () {
    return env({
        file: "./config/local.env",
        vars: {
            NODE_ENV: 'test'
        }
    });
});
