module.exports = function(gulp, plugins, config) {
    return function() {
        var setting = config.setting;
        return plugins.file('setting.js', 'GLOBAL_SETTING='+ JSON.stringify(setting), { src: true })
            .pipe(gulp.dest(config.output + '/assets'));
    };
};
