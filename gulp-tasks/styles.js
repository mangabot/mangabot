var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');

module.exports = function(gulp, plugins, config) {
    return function() {
        var source = {
            base: 'src',
            css: [
                'src/assets/semantic.css',
                'src/app/**/*.css'
            ]
        };
        var processors = [
            autoprefixer({browsers: ['last 2 version']}),
            mqpacker
        ];
        return gulp.src(source.css, {base: source.base})
            .pipe(plugins.postcss(processors))
            .pipe(plugins.vars())
            .pipe(gulp.dest(config.output));
    };
};
