'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var merge2 = require('merge2');
var SystemJsBuilder = require('systemjs-builder');

module.exports = function (options) {

    gulp.task('scripts.build', () => {
        var tsProject = ts.createProject('tsconfig.json');
        return merge2(
            gulp.src(options.config.app.js.inputs)
                .pipe(concat(options.config.app.js.output))
                .pipe(gulp.dest(options.config.paths.build)),

            tsProject.src(options.config.app.ts.inputs)
                .pipe(sourcemaps.init())
                .pipe(ts(tsProject)).js
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(options.config.paths.build + '/' + options.config.app.ts.output)));
    });

    gulp.task('scripts.release', ['scripts.build'], (cb) => {
        return new SystemJsBuilder({
            baseURL: options.config.systemjs.baseURL,
            map: options.config.systemjs.map.release,
            packages: options.config.systemjs.packages
        }).buildStatic(options.config.app.bundle.input, options.config.paths.release + '/' + options.config.app.bundle.output, { minify: true, sourceMaps: true })
            .catch((err) => { console.error(err); })
            .pipe(gulp.src(options.config.paths.build + '/' + options.config.app.js.output))
            .pipe(concat(options.config.app.bundle.output))
            .pipe(gulp.dest(options.config.paths.release));
    });
};