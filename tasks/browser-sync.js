'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = function (options) {

    gulp.task('serve', function () {
        browserSync.init({
            port: 3000,
            server: {
                baseDir: ".",
                middleware: [require('connect-history-api-fallback')()]
            }
        });
    });

};