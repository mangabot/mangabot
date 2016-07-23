'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ lazy: true });
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
var sass = require('./tasks/sass.js')({ dest: 'build' });
var ts = require('./tasks/typescript.js')({ dest: 'build' });

gulp.task('clean', function () {
    return del(['build', 'bin']);
});

gulp.task('build', runSequence('clean', [
    'sass', 'typescript'
]));

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['scripts']);
    gulp.watch('src/**/*.css', ['styles']);
    gulp.watch('src/**/*.html', ['templates']);
});

gulp.task('default', ['build']);