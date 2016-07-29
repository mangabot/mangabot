'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

module.exports = function (options) {

    gulp.task('styles.build', () => {
        return gulp.src(options.config.app.sass.inputs)
            .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
            .pipe(postcss([autoprefixer]))
            .pipe(concat(options.config.app.sass.output))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(options.config.paths.build));
    });

    gulp.task('styles.release', () => {
        return gulp.src(options.config.app.sass.inputs)
            .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(postcss([autoprefixer, cssnano]))
            .pipe(concat(options.config.app.sass.output, { newLine: '' }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(options.config.paths.release));
    });
};