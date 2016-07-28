'use strict';

var gulp = require('gulp');

module.exports = (options) => {
    gulp.task('assets', ['assets.vendors']);

    gulp.task('assets.vendors', () => {
        return gulp.src([
            'node_modules/@angular/**',
            'node_modules/rxjs/**'
        ], { base: '.' })
            .pipe(gulp.dest(options.dest));
    });
};