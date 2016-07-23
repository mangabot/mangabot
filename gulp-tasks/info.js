module.exports = function(gulp, plugins, config) {
    return function() {
        var info = {
            version: config.version
        };
        
        return plugins.file('info.json', JSON.stringify(info), { src: true })
            .pipe(gulp.dest(config.root));
    };
};
