module.exports = function(gulp, plugins, config) {
    var source = {
        base: 'src',
        image: ['src/assets/images/**/*']
    };
    
    return function() {
        return gulp.src(source.image, {base: source.base})
            .pipe(plugins.cache(plugins.imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
            .pipe(gulp.dest(config.output));
    };
};
