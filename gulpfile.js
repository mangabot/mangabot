'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ lazy: true });
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
var systemJsBuilder = require('systemjs-builder');
var sass = require('./tasks/sass.js')({ dest: 'build' });
var ts = require('./tasks/typescript.js')({ dest: 'build' });
var index = require('./tasks/index.js')({ dest: 'build' });
var browserSync = require('./tasks/browser-sync.js')({ dest: 'build' });
var assets = require('./tasks/assets.js')({ dest: 'build' });

gulp.task('clean', () => {
    return del(['build', 'bin']);
});

gulp.task('scripts', (cb) => {
    runSequence('tslint', 'typescript', cb);
});

gulp.task('build', (cb) => {
    runSequence('clean', ['sass'], 'scripts', 'systemjs-builder', 'index', cb);
});

gulp.task('systemjs-builder', () => {
    var builder = new systemJsBuilder('', 'systemjs.config.js');
    return builder.buildStatic('app', 'build/app.js')
        .catch(function (err) {
            console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
        });
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.ts', ['scripts']);
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.html', ['templates']);
});

gulp.task('default', ['build']);