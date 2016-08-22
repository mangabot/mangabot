'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

module.exports = function (options) {

    gulp.task('vendors.build', () => {
        return gulp.src(options.config.vendors.js.inputs)
            .pipe(concat(options.config.vendors.js.output))
            .pipe(gulp.dest(options.config.paths.build));
    });

    gulp.task('vendors.release', ['vendors.build'], () => {
        return gulp.src(options.config.paths.build + '/' + options.config.vendors.js.output)
            .pipe(gulp.dest(options.config.paths.release));
    });
};