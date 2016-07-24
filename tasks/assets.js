'use strict';

var gulp = require('gulp');

module.exports = (options) => {
    gulp.task('assets', ['assets.systemjs']);

    gulp.task('assets.vendors', () => {
        return gulp.src([
            'node_modules/systemjs/**',
            'node_modules/rxjs/**',
            'node_modules/@angular/**',
            'node_modules/angular2-in-memory-web-api/**',
            'node_modules/core-js/**',
            'node_modules/reflect-metadata/**',
            'node_modules/zone.js/**',
            'node_modules/clipboard/**',
            'node_modules/es6-promise/**',
            'node_modules/es6-shim/**',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/moment/moment.js',
            'node_modules/papaparse/papaparse.js',
            'node_modules/lodash/lodash.js'
        ], { base: '.' })
            .pipe(gulp.dest(options.dest));
    });

    gulp.task('assets.systemjs', () => {
        return gulp.src('./systemjs.config.js').pipe(gulp.dest(options.dest));
    });
};