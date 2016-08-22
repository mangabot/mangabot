'use strict';

module.exports = function () {
    var paths = {
        build: 'build',
        release: 'bin'
    };

    return {
        isProd: isProd,

        paths: paths,

        app: {
            ts: {
                inputs: ['src/app/**/*.ts'],
                output: 'app'   // only use for build
            },
            js: {
                inputs: ['src/app/**/*.js'],
                output: 'app.js'    // all app js will be concatenating together
            },
            css: {
                inputs: ['src/app/**/*.scss'],  // support css, sass
                output: 'styles.css'
            },
            bundle: {
                input: 'app',
                output: 'app.js'
            },
            index: {
                input: 'src/index.html',
                output: 'index.html'
            },
            assets: {
                cwd: 'src/assets',
                inputs: ['src/assets/**', '!**/*.css'],
                output: 'assets'
            }
        },

        vendors: {
            js: {
                inputs: [
                    'node_modules/core-js/client/shim.min.js',
                    'node_modules/zone.js/dist/zone.min.js',
                    'node_modules/reflect-metadata/Reflect.min.js',
                    'node_modules/systemjs/dist/system.js'
                ],
                output: 'vendors.js'
            },
            css: {
                inputs: ['src/assets/themes/**/*.css']
            }
        },

        systemjs: {
            baseURL: '',
            map: {
                build: {
                    'app': 'app',
                    '@angular': '../node_modules/@angular',
                    'rxjs': '../node_modules/rxjs',
                    'angular2-in-memory-web-api': '../node_modules/angular2-in-memory-web-api'
                },
                release: {
                    'app': 'build/app',
                    '@angular': 'node_modules/@angular',
                    'rxjs': 'node_modules/rxjs',
                    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api'
                }
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

    function getEvn() {
        return require('yargs').argv.env || 'dev';
    }

    function isProd() {
        var env = getEvn();
        return env === 'prod' || env === 'PROD';
    }
};