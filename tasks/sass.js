'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function (options) {
    gulp.task('sass', function () {
        return gulp.src('./src/app/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(options.dest));
    });
};