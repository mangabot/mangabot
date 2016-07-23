module.exports = function(gulp, plugins, config) {
    return function() {
        var source = {
            base: 'src',
            theme: ['src/assets/themes/**']
        };
        
        return gulp.src(source.theme, {base: source.base})
            .pipe(gulp.dest(config.output));
    };
};