var gulp = require('gulp');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var del = require('del');
var runSequence = require('gulp-sequence');
var concat = require('gulp-concat');
var fs = require('fs');
var package = JSON.parse(fs.readFileSync('package.json'));

gulp.task('clean', function () {
    return del('build');
});

gulp.task('copy', function () {
    return gulp.src([
        'index.html', 'src/app/**/*.js', 'src/app/**/*.html',
        'systemjs.config.js'
    ])
        .pipe(copy('build'));
});

gulp.task('sass', function () {
    return gulp.src('src/app/**/*.scss', { base: 'src/app' })
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build'));
});

gulp.task('vendors', function () {
    return gulp.src(package.dependencies)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('build', runSequence('clean', 'copy', 'vendors', 'sass'));