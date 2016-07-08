module.exports = function(gulp, plugins, config) {
    return function() {
        return require('del')(config.root + "/**");
    };
};
