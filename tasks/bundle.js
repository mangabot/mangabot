'use strict';

var gulp = require('gulp');
var SystemJsBuilder = require('systemjs-builder');

module.exports = (options) => {

    gulp.task('bundle.release', ['bundle.app.release']);

    gulp.task('bundle.app.release', () => {
        return new SystemJsBuilder({
            baseURL: options.config.systemjs.baseURL,
            map: options.config.systemjs.map,
            packages: options.config.systemjs.packages
        }).buildStatic(options.config.app.bundle.input, options.config.paths.release + '/' + options.config.app.bundle.output, { minify: true, sourceMaps: true })
            .catch((err) => { console.error(err); });
    });

};