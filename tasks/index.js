'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var template = require('gulp-template');

module.exports = (options) => {

    gulp.task('index.deploy', () => {
        return gulp.src('src/index.html')
            .pipe(inject(gulp.src([
                options.dest + '/' + options.config.vendors.js.output,
                options.dest + '/**/*.js',
                '!' + options.dest + '/src/**/*.js',
                options.dest + '/**/*.css'
            ], { read: false }), { ignorePath: '../' + options.dest, relative: true }))
            .pipe(gulp.dest(options.dest))
            .pipe(template({ isProd: true }))
            .pipe(gulp.dest(options.dest));
    });

    gulp.task('index.build', () => {
        return gulp.src('src/index.html')
            .pipe(inject(gulp.src([
                options.dest + '/' + options.config.vendors.js.output,
                options.dest + '/**/*.css'
            ], { read: false }), { ignorePath: '../' + options.dest, relative: true }))
            .pipe(gulp.dest(options.dest))
            .pipe(template({
                isProd: options.config.isProd,
                map: options.config.systemjs.map,
                packages: options.config.systemjs.packages
            }))
            .pipe(gulp.dest(options.dest));
    });
};