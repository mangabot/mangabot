module.exports = function (environment) {
    var env = environment || 'dev',
        paths = {
            build: 'build',
            release: 'bin'
        };

    return {
        env: env,

        isDev: env === 'dev' || env === 'DEV',
        isBeta: env === 'beta' || env === 'BETA',
        isProd: isProd(env),

        paths: paths,

        app: {
            ts: {
                inputs: ['./src/app/**/*.ts'],
                output: 'app'
            },
            sass: {
                inputs: ['./src/app/**/*.scss'],
                output: 'app'
            },
            bundle: {
                input: 'app',
                output: 'main.js'
            },
            index: {
                input: 'src/index.html',
                output: 'index.html'
            },
            assets: {
                inputs: ['src/assets/**'],
                output: 'assets'
            }
        },

        vendors: {
            js: {
                inputs: [
                    './node_modules/core-js/client/shim.min.js',
                    './node_modules/zone.js/dist/zone.min.js',
                    './node_modules/reflect-metadata/Reflect.min.js',
                    './node_modules/systemjs/dist/system.js'
                ],
                output: 'externals.js'
            }
        },

        systemjs: {
            baseURL: '',
            map: {
                'app': isProd(env) ? 'build/app' : 'app',
                '@angular': (isProd(env) ? '' : '../') + 'node_modules/@angular',
                'rxjs': (isProd(env) ? '' : '../') + 'node_modules/rxjs',
                'angular2-in-memory-web-api': (isProd(env) ? '' : '../') + 'node_modules/angular2-in-memory-web-api'
            },
            packages: {
                'app': { main: 'main.js', defaultExtension: 'js' },
                '@angular/common': { main: 'index.js', defaultExtension: 'js' },
                '@angular/compiler': { main: 'index.js', defaultExtension: 'js' },
                '@angular/core': { main: 'index.js', defaultExtension: 'js' },
                '@angular/forms': { main: 'index.js', defaultExtension: 'js' },
                '@angular/http': { main: 'index.js', defaultExtension: 'js' },
                '@angular/platform-browser': { main: 'index.js', defaultExtension: 'js' },
                '@angular/platform-browser-dynamic': { main: 'index.js', defaultExtension: 'js' },
                '@angular/router': { main: 'index.js', defaultExtension: 'js' },
                '@angular/router-deprecated': { main: 'index.js', defaultExtension: 'js' },
                '@angular/upgrade': { main: 'index.js', defaultExtension: 'js' },
                'rxjs': { defaultExtension: 'js' },
                'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
            }
        }
    };

    function isProd(env) {
        return env === 'prod' || env === 'PROD';
    }
};