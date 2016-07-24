'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = function (options) {

    gulp.task('serve', function () {
        browserSync.init({
            server: {
                baseDir: "."
            }
        });
    });

};