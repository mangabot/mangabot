module.exports = function(gulp, plugins, config) {
    var inject = {
        index: 'index.html',
        src: [
            config.output + '/vendors.js',
            config.output + '/assets/**/*.js',
            config.output + '/assets/**/*.css',
            config.output + '/app/**/*.css'         
        ]
    };

    return function() {
        return gulp.src(inject.index)
            .pipe(plugins.replace("{{APP_URL}}", config.setting.app_url))
            .pipe(plugins.inject(gulp.src(inject.src, {read: false}), 
                {ignorePath: config.output, relative: true}))
            .pipe(gulp.dest(config.output));
    };
};
