'use strict';
var GulpConfig = (function () {
    var version = "ver-" + Math.random().toString(36).substring(2, 8);
    var SETTINGS = {
        dev: {
            api_url: "http://app-dev.hoiio.com:8080/contactmanager",
            app_url: "http://app-dev.hoiio.com:3000/" + version + "/",
        },
        beta: {
            api_url: "https://apps-beta.hoiio.com/contact-manager",
            app_url: "https://appsalpha.hoiio.com/contact-manager/" + version + "/",
        },
        prod: {
            api_url: "https://contactmanager.hoiio.com",
            app_url: "https://apps.hoiio.com/contact-manager/" + version + "/",
        }
    };
    
    function gulpConfig(plugins) {
        var profile = plugins.util.env.profile;
        profile = (profile ? profile : 'dev').toLowerCase();
        if (profile == 'production') {
            profile = 'prod';
        }
        plugins.util.log('Using ' + profile + ' profile...');
        var root = profile == 'prod'? 'bin' : (profile == 'beta') ? 'bin' : 'build';
        return {
            profile: profile,
            debug: profile == 'dev' || profile == 'beta',
            output: root + '/' + version,
            port: 3000,
            root: root,
            version: version,
            setting: SETTINGS[profile],
        };
    }
    return gulpConfig;
})();
module.exports = GulpConfig;