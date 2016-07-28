'use strict';

var gulp = require('gulp');
var SystemJsBuilder = require('systemjs-builder');

module.exports = (options) => {

    gulp.task('module-loader', options.config.isProd ? deploy : build);

    function build() {

    }

    function deploy() {
        return new SystemJsBuilder({
            baseURL: '',
            map: options.config.systemjs.map,
            packages: options.config.systemjs.packages
        }).buildStatic(options.config.app.bundle.input, 'build/' + options.config.app.bundle.output, { minify: false, sourceMaps: true })
            .catch((err) => { console.error('>>> [systemjs-builder] Bundling failed ', err); });
    }

};