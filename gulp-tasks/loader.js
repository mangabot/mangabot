module.exports = {
    load: function(tasks, gulp, plugins, config) {
        for (var i = 0; i < tasks.length; ++i) {
            var task = tasks[i];
            gulp.task(task, require('./' + task)(gulp, plugins, config));
        }
    }
};
