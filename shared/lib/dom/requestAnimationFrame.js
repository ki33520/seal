'use strict';
    
var nativeRAF = global.requestAnimationFrame ||
  global.webkitRequestAnimationFrame ||
  global.mozRequestAnimationFrame;

var lastTime = 0;

global.requestAnimationFrame = nativeRAF ||
  function(callback) {
    var currTime = Date.now();
    var timeDelay = Math.max(0, 16 - (currTime - lastTime));

    lastTime = currTime + timeDelay;
    return global.setTimeout(function() {
      callback(Date.now());
    }, timeDelay);
  };

// Works around a rare bug in Safari 6 where the first request is never invoked.
if(typeof window !== "undefined"){
  window.requestAnimationFrame = requestAnimationFrame
  window.requestAnimationFrame(function() {});
}

module.exports = requestAnimationFrame;