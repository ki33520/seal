var webpack = require('webpack');
var browserSync = require("browser-sync");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.hot-update.js');
var bundler = webpack(config);

var hmrPort = 9527;
new WebpackDevServer(bundler, {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo:true,
    stats: {
        colors: true
    },
    watchOptions: {
        aggregateTimeout: 800
    },
    historyApiFallback: true
}).listen(hmrPort, 'localhost', function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log('🌎 HMR Listening at %d',hmrPort);
});
