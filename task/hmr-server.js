'use strict'
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.hot-update.js');

var hmrPort = process.env.HMR_PORT || 5000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo:true,
  inline:true,
  //contentBase:"http://localhost:3000/",
  watchOptions:{
      aggregateTimeout:800
  },
  historyApiFallback: true
}).listen(hmrPort, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('🌎 hmr-server Listening at %d',hmrPort);
});
