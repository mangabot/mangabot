'use strict';
var gulp = require('gulp');
var argv = require('yargs').argv;
var config = require('./tasks/config.js')(argv.env);
var plugins = require('gulp-load-plugins')({ lazy: true });
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
var concat = require('gulp-concat');

require('./tasks/sass.js')({ dest: 'build', config: config });
require('./tasks/transpile.js')({ dest: 'build', config: config });
require('./tasks/index.js')({ dest: 'build', config: config });
require('./tasks/browser-sync.js')({ dest: 'build', config: config });
require('./tasks/systemjs.js')({ dest: 'build', config: config });

gulp.task('clean', () => {
    return del(['build', 'bin']);
});

gulp.task('clean-after-deploy', () => {
    return del('build/src');
});

gulp.task('scripts', (cb) => {
    runSequence(['lint', 'transpile'], cb);
});

gulp.task('vendors', () => {
    return gulp.src(config.vendors.js.inputs)
        .pipe(concat(config.vendors.js.output))
        .pipe(gulp.dest('build'));
});

gulp.task('build', (cb) => {
    runSequence('clean', ['sass', 'vendors', 'scripts'], 'module-loader', 'index.build', cb);
});

gulp.task('deploy', (cb) => {
    runSequence('clean', ['sass', 'vendors', 'scripts'], 'module-loader', 'index.deploy', 'clean-after-deploy', cb);
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.ts', ['scripts']);
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.html', ['templates']);
});

gulp.task('default', ['build']);