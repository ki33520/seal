var gulp = require("gulp"),
    nodemon = require("nodemon"),
    // livereload = require('gulp-livereload'),
    browserSync = require("browser-sync");
require("./task/webpack-inject.js");
require("./task/develop-server");
