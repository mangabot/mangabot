'use strict';

var gulp = require('gulp');
var argv = require('yargs').argv;
var plugins = require('gulp-load-plugins')({ lazy: true });
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
var concat = require('gulp-concat');

var config = require('./tasks/config.js')(argv.env);
require('./tasks/styles.js')({ dest: config.dest, config: config });
require('./tasks/transpile.js')({ dest: config.dest, config: config });
require('./tasks/index.js')({ dest: config.dest, config: config });
require('./tasks/browser-sync.js')({ dest: config.dest, config: config });
require('./tasks/bundle.js')({ dest: config.dest, config: config });
require('./tasks/assets.js')({ dest: config.dest, config: config });

gulp.task('clean', () => {
    return del(['build', 'bin']);
});

gulp.task('scripts.build', (cb) => {
    runSequence(['lint', 'transpile.build'], cb);
});

gulp.task('scripts.release', (cb) => {
    runSequence(['lint', 'transpile.release'], cb);
});

gulp.task('vendors.build', () => {
    return gulp.src(config.vendors.js.inputs)
        .pipe(concat(config.vendors.js.output))
        .pipe(gulp.dest(config.paths.build));
});

gulp.task('vendors.release', ['vendors.build'], () => {
    return gulp.src(config.paths.build + '/' + config.vendors.js.output)
        .pipe(gulp.dest(config.paths.release));
});

gulp.task('build', (cb) => {
    if (!argv.env) {
        plugins.util.log('No [env] command paramter, default is dev');
    }
    runSequence('clean', ['assets.build', 'styles.build', 'vendors.build', 'scripts.build'], 'index.build', cb);
});

gulp.task('release', (cb) => {
    if (!argv.env) {
        plugins.util.log('No [env] command paramter, default is dev');
    }
    runSequence('clean', ['assets.release', 'styles.release', 'vendors.release', 'scripts.release'], 'bundle.release', 'index.release', cb);
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.ts', ['scripts']);
    gulp.watch('src/**/*.scss', ['styles']);
    gulp.watch('src/**/*.html', ['templates']);
});

gulp.task('default', ['build']);