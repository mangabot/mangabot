'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function (options) {
    gulp.task('typescript', function () {
        var tsProject = ts.createProject('tsconfig.json');
        return tsProject.src('./src/app/**/*.ts')
            .pipe(ts(tsProject)).js
            .pipe(gulp.dest(options.dest));
    });
};