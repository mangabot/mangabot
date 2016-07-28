'use strict';

var gulp = require('gulp');

module.exports = (options) => {

    gulp.task('assets.build', ['assets.app.build']);

    gulp.task('assets.release', ['assets.app.release']);

    gulp.task('assets.app.build', () => {
        return gulp.src(options.config.app.assets.inputs, { base: 'src' })
            .pipe(gulp.dest(options.config.paths.build + '/' + options.config.app.assets.output));
    });

    gulp.task('assets.app.release', ['assets.app.build'], () => {
        return gulp.src(options.config.paths.build + '/' + options.config.app.assets.output)
            .pipe(gulp.dest(options.config.paths.release + '/' + options.config.app.assets.output));
    });
};