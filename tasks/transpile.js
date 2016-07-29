'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function (options) {

    gulp.task('transpile.build', () => {
        var tsProject = ts.createProject('tsconfig.json');
        return tsProject.src(options.config.app.ts.inputs)
            .pipe(sourcemaps.init({ identityMap: true }))
            .pipe(ts(tsProject)).js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(options.config.paths.build + '/' + options.config.app.ts.output));
    });

    gulp.task("lint", () => {
        return gulp.src(options.config.app.ts.inputs)
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