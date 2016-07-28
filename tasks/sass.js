'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function (options) {
    gulp.task('sass', function () {
        return gulp.src(options.config.app.sass.inputs)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(options.dest + '/' + options.config.app.sass.output));
    });
};