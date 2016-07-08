'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: true});
var runSequence = require('run-sequence').use(gulp);
var config = require('./gulp-tasks/config.js')(plugins);

/* Load all tasks */
require('./gulp-tasks/loader').load([
    'clean', 
    'scripts', 
    'styles', 
    'themes', 
    'templates', 
    'images', 
    'assemblies',
    'jsons',
    'csvs',
    'settings',
    'serve',
    'info',
    'index'
], gulp, plugins, config);

gulp.task('build', function () {
    runSequence(
        'clean', [
            'scripts',
            'styles',
            'themes',
            'templates',
            'images',
            'jsons',
            'csvs',
            'settings',
            'info',
            'index'
        ], 'assemblies');
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['scripts']);
    gulp.watch('src/**/*.css', ['styles']);
    gulp.watch('src/**/*.html', ['templates']);
});

gulp.task('default', ['build']);
