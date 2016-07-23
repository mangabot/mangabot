var replace = require('gulp-replace');

module.exports = function(gulp, plugins, config) {
    var source = {
        base: 'src/assets/',
        html: ['src/assets/index.html']
    };
    
    return function() {
        return gulp.src(source.html, {base: source.base})
            .pipe(gulp.dest(config.root));
    };
};
