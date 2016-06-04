var path = require("path"),
    _ = require("lodash");
var helper = require("./helper");

var env = {
    buildFolder: "build/",
    distFolder: "dist/",
    vendorPath: "./client/vendor/",
    pagePath: "./view/",
    hmrPath: "/hmr/"
};

var moduleConfig = require('./config/module.json'),
    modules = [];
_.each(moduleConfig, function(moduleObj, moduleName) {
    var entryJS = moduleObj.entryJS !== undefined ? moduleObj.entryJS :
        moduleObj.path + moduleName + ".jsx";
    var entryCSS = moduleObj.entryCSS !== undefined ? moduleObj.entryCSS :
        moduleObj.path + "stylesheet/" + moduleName + ".styl";
    var entryHtml = [];
    _.each(moduleObj.html, function(pageHtml) {
        entryHtml.push(env.pagePath + pageHtml);
    });
    // console.log('entryHtmls',entryHtml)
    var module = _.extend(moduleObj, {
        name: moduleName,
        entryCSS: entryCSS,
        entryJS: entryJS,
        html: entryHtml
    });
    // console.log(module);
    modules.push(module);
})
env.modules = modules;
// console.log('modules',modules);

var vendorConfig = require('./config/vendor.json'),
    vendors = [];
_.each(vendorConfig, function(vendorJS, vendorName) {
    var vendor = {
        name: vendorName,
        entryJS: vendorJS,
        // entryCSS:vendorObj.css
        // entry:_.union(vendorObj.js,vendorObj.css)
    };
    vendors.push(vendor);
});
env.vendors = vendors;

var lanIP = helper.getLanIP()
env.lanIP = lanIP
env.reloaderPort = process.env.RELOADER_PORT || 7000;
env.hmrPort = process.env.HMR_PORT || 5000;
env.hmrBasePath = "http://"+lanIP+":"+env.hmrPort
env.reloaderBasePath = "http://"+lanIP+":"+env.reloaderPort


module.exports = env;
