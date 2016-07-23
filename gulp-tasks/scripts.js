module.exports = function(gulp, plugins, config) {
    var script = {
        base: 'src',
        typeScript: [
            'src/**/*.ts',            
        ],
        javaScript: [
            'src/assets/semantic.js'
        ],
        vendor: {
            base: 'node_modules',
            typeScript: [                
            ],
            javaScript: [
                'node_modules/papaparse/papaparse.js',
                'node_modules/jquery/dist/jquery.js',
                'node_modules/underscore/underscore.js',
                'node_modules/clipboard/dist/clipboard.js',
                'node_modules/es6-promise/dist/es6-promise.js',
                'node_modules/es6-module-loader/dist/es6-module-loader-dev.js',
                'node_modules/reflect-metadata/Reflect.js',
                'node_modules/systemjs/dist/system.src.js',
                'node_modules/angular2/bundles/angular2-polyfills.js',
                'node_modules/rxjs/bundles/Rx.js',
                'node_modules/angular2/bundles/router.dev.js',
                'node_modules/angular2/bundles/angular2.dev.js',
                'node_modules/angular2/bundles/http.dev.js',
                'node_modules/es6-shim/es6-shim.js',
                'node_modules/moment/moment.js',
                'node_modules/angular2-cookie/bundles/angular2-cookie.min.js'
            ]
        }
    };
    
    return function() {
        // if (config.env == 'prod') {
        //     return buildRelease();
        // }
        return buildDev();
    };

    function buildDev() {
        /* Project JS */
        var jsStream = gulp.src(script.javaScript, {base: script.base})
            .pipe(gulp.dest(config.output));

        /* Project TS */
        var ts = plugins.typescript;
        var tsProject = ts.createProject('tsconfig.json');
        var tsStream = tsProject
            .src(script.typeScript)
            .pipe(ts(tsProject))
            .js.pipe(gulp.dest(config.output));
            
        /* Vendor TS */
        var vtsStream = gulp.src(script.vendor.typeScript, {base: script.vendor.base})
            .pipe(ts({
                "target": "es5",
                "module": "system",
                "moduleResolution": "node",
                "sourceMap": true,
                "emitDecoratorMetadata": true,
                "experimentalDecorators": true,
                "removeComments": false,
                "noImplicitAny": false
            }))
            .js.pipe(gulp.dest(config.output));

        /* Vendor JS */
        var vjsStream = gulp.src(script.vendor.javaScript, {base: script.vendor.base})
            .pipe(plugins.concat('vendors.js'))
            .pipe(gulp.dest(config.output));
        
        return require('merge2')([jsStream, vjsStream, tsStream, vtsStream]);
    }

    function buildRelease() {
        return gulp.src(config.allJavascript)
            .pipe(plugins.jshint('.jshintrc'))
            .pipe(plugins.jshint.reporter('default'))
            .pipe(plugins.concat('app.js'))
            .pipe(gulp.dest(config.output))
            .pipe(plugins.rename({suffix: '.min'}))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(config.output));
    }
};
