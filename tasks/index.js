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
                isProd: options.config.isProd(),
                map: options.config.systemjs.map.build,
                packages: options.config.systemjs.packages
            }))
            .pipe(gulp.dest(options.config.paths.build));
    });

    gulp.task('index.release', () => {
        return gulp.src(options.config.app.index.input)
            .pipe(inject(gulp.src([
                options.config.paths.release + '/' + options.config.vendors.js.output,
                options.config.paths.release + '/**/*.js',
                options.config.paths.release + '/**/*.css',
                '!' + options.config.paths.release + '/assets/**'
            ], { read: false }), { ignorePath: '../' + options.config.paths.release, relative: true }))
            .pipe(gulp.dest(options.config.paths.release))
            .pipe(template({ isProd: true, map: {}, packages: {} }))
            .pipe(gulp.dest(options.config.paths.release));
    });
};