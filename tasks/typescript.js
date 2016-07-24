'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require("gulp-tslint");

module.exports = function (options) {

    gulp.task('typescript', () => {
        var tsProject = ts.createProject('tsconfig.json');
        return tsProject.src('./src/app/**/*.ts')
            .pipe(ts(tsProject)).js
            .pipe(gulp.dest(options.dest));
    });

    gulp.task("tslint", () => {
        return gulp.src('./src/app/**/*.ts')
            .pipe(tslint({
                formatter: "verbose",
                configuration: {
                    rules: {
                        "class-name": true
                    }
                }
            }))
            .pipe(tslint.report({
                summarizeFailureOutput: true
            }));
    });
};