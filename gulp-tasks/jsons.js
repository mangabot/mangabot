module.exports = function(gulp, plugins, config) {
    var source = {
        base: 'src/assets/',
        json: ['src/assets/countries.json']
    };
    
    return function() {
        return gulp.src(source.json, {base: source.base})
            .pipe(gulp.dest(config.output + '/assets/data'));
    };
};
