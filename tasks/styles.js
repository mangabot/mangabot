'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function (options) {

    gulp.task('styles.build', () => {
        return gulp.src(options.config.app.sass.inputs)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(options.config.paths.build + '/' + options.config.app.sass.output));
    });

    gulp.task('styles.release', () => {
        return gulp.src(options.config.app.sass.inputs)
            .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(options.config.paths.release + '/' + options.config.app.sass.output));
    });
};