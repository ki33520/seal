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
router.get("/cart", require("./controller/cart").cart);
router.get("/membercenter", require("./controller/membercenter"));
router.get("/aboutus", require("./controller/aboutus"));
router.get("/membercenter/collect", require("./controller/membercollect"));
router.get("/membercenter/update", require("./controller/memberupdate").update);
router.post("/updatebasic", require("./controller/memberupdate").basic);
router.post("/updatememberbasic", require("./controller/memberupdatebasic").update);
router.all("*", require("./controller/main.js").notFoundHandler);
router.use(require("./controller/main.js").errorHandler);

module.exports = router;
