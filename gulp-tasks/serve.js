var browserSync = require('browser-sync');

module.exports = function(gulp, plugins, config) {
    return function() {
         browserSync({
            open: "external",
            host: config.setting.app_url.split('/')[2].split(':', 1)[0],
            port: config.port,
            server: {
                baseDir: config.root,
                index: "index.html"
            }
        }, function (err, bs) {
            bs.addMiddleware("*", function (req, res) {
                res.writeHead(302, {
                    "location": config.setting.app_url
                });
                res.end("Redirecting!");
            });
        });


        gulp.watch([
            config.output + "/**/*.js",
            config.output + "/**/*.html",
            config.output + "/**/*.css"
        ], browserSync.reload, function () {
        });
    };
};