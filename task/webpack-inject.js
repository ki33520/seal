var gulp = require("gulp"),
    inject = require("gulp-inject"),
    // mapstream = require("map-stream"),
    path = require("path"),
    fs = require("fs"),
    // del = require("del"),
    _ = require("lodash");

var env = require("./environment");

gulp.task("develop-webpack", function() {
    _.each(env.modules, function(moduleObj) {
        var injectTarget = moduleObj.html,
            injectedPath = path.dirname(injectTarget),
            cssFiles = [],
            jsFiles = [],
            // vendorCSSFile = path.join(env.vendorPath, env.buildFolder + moduleObj.vendor + '.css'),
            // moduleCSSFile = path.join(moduleObj.path, env.buildFolder + '/*.css'),
            vendorJSFile = path.join(env.vendorPath, env.buildFolder + moduleObj.vendor + '.js'),
            moduleJSFile = path.join(moduleObj.path, env.buildFolder + '*.js');
        jsFiles.push(vendorJSFile);
        jsFiles.push(moduleJSFile);
        var sources = gulp.src(_.union(cssFiles, jsFiles), {
            read: false
        });
        // console.log('jsFiles',cssFiles)
        gulp.src(injectTarget).pipe(inject(sources, {
            relative: true,
            empty:true,
            transform: function(filepath) {
                var vendorPattern = new RegExp(".+" + moduleObj.vendor),
                    buildPattern = new RegExp(".+" + env.buildFolder);
                // filepath = filepath.replace(prefixPattern, './');
                // console.log('filepath',filepath)
                if (vendorPattern.test(filepath) === true) {
                    if (path.extname(filepath) === ".js") {
                        // filepath = filepath.replace(buildPattern, env.hmrPath);
                    }
                } else if (vendorPattern.test(filepath) === false) {
                    if (path.extname(filepath) === ".js") {
                        // filepath = filepath.replace(buildPattern, env.hmrPath);
                    }
                }
                return inject.transform.apply(inject.transform, arguments);
            }

        })).pipe(gulp.dest(injectedPath));
    });
});
gulp.task("deploy-webpack", function() {
    _.each(env.modules, function(moduleObj) {
        var injectTarget = moduleObj.html,
            injectedPath = path.dirname(injectTarget),
            cssFiles = [],
            jsFiles = [],
            // vendorCSSFile = path.join(env.vendorPath, env.distFolder + moduleObj.vendor + '-*.css'),
            // extensionCssFile = path.join(env.extensions.path, '/' + env.extensions.distFolder + '/' + moduleObj.name + '-*.css'),
            moduleCSSFile = path.join(moduleObj.path, env.distFolder + '*.css'),
            vendorJSFile = path.join(env.vendorPath, env.distFolder + moduleObj.vendor + '-*.js'),
            moduleJSFile = path.join(moduleObj.path, env.distFolder + '*.js');
        // cssFiles.push(vendorCSSFile);
        cssFiles.push(moduleCSSFile);
        jsFiles.push(vendorJSFile);
        jsFiles.push(moduleJSFile);
        // console.log(jsFiles)
        var sources = gulp.src(_.union(cssFiles, jsFiles), {
            read: false
        });
        gulp.src(injectTarget).pipe(inject(sources, {
            relative: true,
            transform: function(filepath) {
                // console.log(filepath);
                filepath = filepath.replace(/^\.{2}\//g, '/');
                return inject.transform.apply(inject.transform, arguments);
            }
        })).pipe(gulp.dest(injectedPath));
    });
});
