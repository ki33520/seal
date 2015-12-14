'use strict'
var express = require('express');

var router = express.Router();

require("babel-core/register")({
    optional:["runtime"],
    // presets: ["react","es2015"],
    extensions: [".es6", ".es", ".jsx"]
});

var mainController = require("./controller/main");

router.get("/logingateway",require("./controller/authorize").loginGateway);
router.get("/logoutgateway",mainController.requireAuthorize,require("./controller/authorize").logoutGateway);

router.get("/", require("./controller/main.js").index);
router.post("/weather", require("./controller/main.js").weather);
router.get("/gooddetail/:id", require("./controller/gooddetail"));
router.get("/goodlist/:keyword", require("./controller/goodlist"));
router.get("/activity", require("./controller/activity"));
router.get("/trendy", require("./controller/trendy"));
router.get("/cart", require("./controller/cart").cart);
router.post("/updateCart", require("./controller/cart").updateCart);
router.post("/deleteCart", require("./controller/cart").deleteCart);

router.get("/confirmorder",mainController.requireAuthorize,require("./controller/confirmorder").confirmOrder);
router.post("/submitorder",mainController.requireAuthorize,require("./controller/confirmorder").submitOrder);
router.get("/orderlist",mainController.requireAuthorize,require("./controller/orderlist"));
router.get("/orderdetail/:id",mainController.requireAuthorize,require("./controller/orderdetail").orderDetail);

router.get("/aboutus", require("./controller/aboutus"));
router.get("/help", require("./controller/help").index);
router.post("/sendfeedback", require("./controller/help").sendFeedback);

router.get("/membercenter", require("./controller/membercenter"));
router.get("/membercenter/collect", require("./controller/membercollect"));
router.get("/membercenter/comment", require("./controller/membercomment").index);
router.get("/membercenter/update", require("./controller/memberupdate").update);

router.post("/updatebasic", require("./controller/memberupdate").updateBasic);
router.post("/updatepassword", require("./controller/memberupdate").updatePassword);
router.post("/updatemembercard", require("./controller/memberupdate").updateMembercard);
router.post("/updatemembercardverifycode", require("./controller/memberupdate").updateMemberCardVerifyCode);

router.get("/receiver",mainController.requireAuthorize,require("./controller/receiver").receiver);
router.get("/cascadearea",mainController.requireAuthorize,require("./controller/receiver").cascadeArea);
router.post("/savereceiver",mainController.requireAuthorize,require("./controller/receiver").saveReceiver);

router.get("/coupon", require("./controller/coupon"));
router.get("/coupondetail", require("./controller/coupondetail"));


router.all("/mock/api/:api",require("./mock/api").all);
router.all("*", require("./controller/main.js").notFoundHandler);
router.use(require("./controller/main.js").errorHandler);

module.exports = router;
