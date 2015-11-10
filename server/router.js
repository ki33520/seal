'use strict'
var express = require('express');

var router = express.Router();

require("babel-core/register")({
    optional:["runtime"],
    // presets: ["react","es2015"],
    extensions: [".es6", ".es", ".jsx"]
});

router.get("/", require("./controller/main.js").index);
router.post("/weather", require("./controller/main.js").weather);
router.get("/gooddetail/:id", require("./controller/gooddetail"));
router.all("*", require("./controller/main.js").notFoundHandler);
router.use(require("./controller/main.js").errorHandler);

module.exports = router;
