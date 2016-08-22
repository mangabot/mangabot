'use strict';

var gulp = require('gulp');
var argv = require('yargs').argv;
var plugins = require('gulp-load-plugins')({ lazy: true });
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
var concat = require('gulp-concat');

var config = require('./tasks/config.js')();
require('./tasks/styles.js')({ dest: config.dest, config: config });
require('./tasks/transpile.js')({ dest: config.dest, config: config });
require('./tasks/index.js')({ dest: config.dest, config: config });
require('./tasks/browser-sync.js')({ dest: config.dest, config: config });
require('./tasks/bundle.js')({ dest: config.dest, config: config });
require('./tasks/assets.js')({ dest: config.dest, config: config });
require('./tasks/vendors.js')({ dest: config.dest, config: config });
require('./tasks/scripts.js')({ dest: config.dest, config: config });

gulp.task('clean', () => {
    return del(['build', 'bin']);
});

gulp.task('build', (cb) => {
    if (!argv.env) {
        argv.env = 'dev';
        plugins.util.log('No [env] command paramter, default is dev');
    }
    plugins.util.log('Environment: ' + argv.env);
    runSequence('clean', ['assets.build', 'styles.build', 'vendors.build', 'scripts.build'], 'index.build', cb);
});

gulp.task('deploy', (cb) => {
    if (!argv.env) {
        argv.env = 'prod';
        plugins.util.log('No [env] command paramter, default is prod');
    }
    plugins.util.log('Environment: ' + argv.env);
    runSequence('clean', ['assets.release', 'styles.release', 'vendors.release', 'scripts.release'], 'index.release', cb);
});

gulp.task('watch', ['build'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
    gulp.watch('src/**/*.scss', ['styles.build']);
    gulp.watch('src/**/*.html', ['templates']);
});

gulp.task('default', ['build']);