var gulp = require('gulp');
var sass = require('gulp-sass');

module.export = function(gulp, plugins, config) {
    return gulp.src('src/app/**/*.scss', {
            base: 'src/app'
        })
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('build'));
};