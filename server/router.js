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
router.get("/goodlist/:keyword", require("./controller/goodlist"));
router.get("/activity", require("./controller/activity"));
router.get("/trendy", require("./controller/trendy"));
router.get("/coupons", require("./controller/coupons"));

router.get("/cart", require("./controller/cart").cart);
router.all("/mock/api/:api",require("./mock/api").all);
router.all("*", require("./controller/main.js").notFoundHandler);
router.use(require("./controller/main.js").errorHandler);

module.exports = router;
