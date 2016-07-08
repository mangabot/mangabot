module.exports = function(gulp, plugins, config) {
    var source = {
        base: 'src',
        template: ['src/**/*.html']
    };
    
    return function() {
        return gulp.src(source.template, {base: source.base})
            .pipe(gulp.dest(config.output));
    };
};