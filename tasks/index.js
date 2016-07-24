'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');

module.exports = (options) => {
    gulp.task('index', () => {
        return gulp.src('src/index.html')
            .pipe(inject(gulp.src([
                './node_modules/core-js/client/shim.min.js',
                './node_modules/zone.js/dist/zone.js',
                './node_modules/reflect-metadata/Reflect.js',
                './node_modules/systemjs/dist/system.src.js',
                options.dest + '/systemjs.config.js',
                options.dest + '/**/*.css'
            ], { read: false }), { ignorePath: '../' + options.dest, relative: true }))
            .pipe(gulp.dest(options.dest));
    });
};