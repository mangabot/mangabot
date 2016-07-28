'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var template = require('gulp-template');

module.exports = (options) => {

    gulp.task('index.build', () => {
        return gulp.src(options.config.app.index.input)
            .pipe(inject(gulp.src([
                options.config.paths.build + '/' + options.config.vendors.js.output,
                options.config.paths.build + '/**/*.css'
            ], { read: false }), { ignorePath: '../' + options.config.paths.build, relative: true }))
            .pipe(gulp.dest(options.config.paths.build))
            .pipe(template({
                isProd: options.config.isProd,
                map: options.config.systemjs.map,
                packages: options.config.systemjs.packages
            }))
            .pipe(gulp.dest(options.config.paths.build));
    });

    gulp.task('index.release', () => {
        return gulp.src(options.config.app.index.input)
            .pipe(inject(gulp.src([
                options.config.paths.build + '/' + options.config.vendors.js.output,
                options.config.paths.build + '/*.js',
                options.config.paths.build + '/**/*.css'
            ], { read: false }), { ignorePath: '../' + options.config.paths.build, relative: true }))
            .pipe(gulp.dest(options.config.paths.release))
            .pipe(template({ isProd: true }))
            .pipe(gulp.dest(options.config.paths.release));
    });
};