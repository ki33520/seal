'use strict';
var gulp = require("gulp"),
    os = require("os"),
    nodemon = require("nodemon"),
    webpack = require('webpack'),
    browserSync = require("browser-sync"),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    config = require('./webpack.hot-update.js');

var bundler = webpack(config);

gulp.task("nodemon", function() {
    // livereload.listen();
    nodemon({
        delay: "200ms",
        script: "app.js",
        execMap: {
            "js": "node"
        },
        env: {
            // "NODE_ENV": "develop"
        },
        verbose: true,
        stdout: false,
        // ignore: [".git","node_modules","client","shared","task"],
        watch: [
            "server/controller","server/mock", "server/lib", "server/*.js", "view",
            // "shared/chunk/**/*.jsx","shared/chunk/**/*.es6"
        ],
        ext: "js html json es6 jsx"
    }).on("readable", function(data) {
        this.stdout.on('data', function(chunk) {
            if (/server listening at/.test(chunk)) {
                // livereload.reload();
                browserSync.reload({
                    stream: false
                })
            }
            process.stdout.write(chunk);
        });
        this.stderr.pipe(process.stderr);
    });
});



gulp.task("start", ["nodemon"], function() {
    var listenPort = process.env.LISTEN_PORT || 3000;
    var devPort = process.env.DEV_PORT || 5000;

    var ipv4;
    var iptable = {}
    var ifaces=os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details,alias){
        if (details.family=='IPv4') {
            if(details.address !== "127.0.0.1"){
                ipv4 = details.address
            }
          // iptable[dev+(alias?':'+alias:'')]=details.address;
        }
      });
    }
    browserSync({
        proxy: {
            target: "http://"+ipv4+":" + listenPort,
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: config.output.publicPath,
                    stats: {
                        colors: true
                    },
                    hot: true,
                    noInfo: true
                }),
                webpackHotMiddleware(bundler)
            ],
        },
        port: devPort,
        files: "view/*.html",
        online: false,
        logLevel: "info",
        notify: false,
        open: false
    }, function() {
        console.log('🌎 dev-server Listening at %d', devPort);
    })
})