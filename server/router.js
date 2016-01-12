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

router.get("/", require("./controller/index.js").index);
router.get("/searchhotwords", require("./controller/index.js").searchHotWords);
router.post("/searchassociate", require("./controller/index.js").searchAssociate);
router.get("/activitygood", require("./controller/index.js").activityGood);
router.get("/mobileonly/:id", require("./controller/topic.js").mobileOnly);
router.get("/finest/:id", require("./controller/topic.js").finest);
router.get("/stockup/:id", require("./controller/topic.js").stockup);
router.get("/flashbuy/:id", require("./controller/flashbuy.js"));
router.get("/polymer", require("./controller/polymer").polymer);
router.get("/categorybrands", require("./controller/polymer").categoryBrands);
router.get("/allbrands", require("./controller/polymer").allBrands);
router.get("/allorigins", require("./controller/polymer").allOrigins);

router.get("/gooddetail/:id", require("./controller/gooddetail").goodDetail);
router.get("/fetchgood/:id", require("./controller/gooddetail").fetchGood);
router.get("/addcart", require("./controller/gooddetail").addCart);
router.get("/cartCount", require("./controller/gooddetail").cartCount);

router.get("/goodlist", require("./controller/goodlist"));
router.get("/activity/:id", require("./controller/activity"));
router.get("/trendy", require("./controller/trendy").trendy);
router.post("/trendyActivity",require("./controller/trendy").activity);

router.get("/cart",mainController.requireAuthorize,require("./controller/cart").cart);
router.post("/updateCart", mainController.requireAuthorize,require("./controller/cart").updateCart);
router.post("/deleteCart", mainController.requireAuthorize,require("./controller/cart").deleteCart);
router.post("/fetchCart", mainController.requireAuthorize,require("./controller/cart").fetchCart);
router.get("/goodcomment/:id", require("./controller/goodcomment").index);
router.get("/goodcommentshow/:id",require("./controller/goodcomment").showComment);

router.post("/confirmorder",require("./controller/confirmorder").confirmOrder);
router.post("/submitorder",mainController.requireAuthorize,require("./controller/confirmorder").submitOrder);
router.get("/orderlist",mainController.requireAuthorize,require("./controller/orderlist"));
router.get("/orderdetail/:id",mainController.requireAuthorize,require("./controller/orderdetail").orderDetail);

router.get("/aboutus", require("./controller/aboutus"));
router.get("/help", require("./controller/help").index);
router.post("/sendfeedback", require("./controller/help").sendFeedback);

router.get("/membercenter",mainController.requireAuthorize,require("./controller/membercenter"));
router.get("/membercenter/collect",mainController.requireAuthorize,require("./controller/membercollect"));
router.get("/membercenter/comment",mainController.requireAuthorize,require("./controller/membercomment").index);
router.get("/membercenter/showcomment",mainController.requireAuthorize,require("./controller/membercomment").showComment);
router.get("/membercenter/update",mainController.requireAuthorize,require("./controller/memberupdate").update);

router.post("/updatebasic",mainController.requireAuthorize,require("./controller/memberupdate").updateBasic);
router.post("/updatepassword",mainController.requireAuthorize,require("./controller/memberupdate").updatePassword);
router.post("/updatemembercard",mainController.requireAuthorize,require("./controller/memberupdate").updateMembercard);
router.post("/updatemembercardverifycode",mainController.requireAuthorize,require("./controller/memberupdate").updateMemberCardVerifyCode);

router.get("/receiver",mainController.requireAuthorize,require("./controller/receiver").receiver);
router.get("/addreceiver",mainController.requireAuthorize,require("./controller/receiver").addReceiver);
router.get("/updatereceiver/:id",mainController.requireAuthorize,require("./controller/receiver").updateReceiver);
router.get("/cascadearea",mainController.requireAuthorize,require("./controller/receiver").cascadeArea);
router.post("/savereceiver",mainController.requireAuthorize,require("./controller/receiver").saveReceiver);

router.get("/coupon", require("./controller/coupon").coupon);
router.post("/fetchCoupon", require("./controller/coupon").fetchCoupon);
router.get("/coupondetail/:id", require("./controller/coupondetail"));

router.all("/mock/api/:api",require("./mock/api").all);
router.all("*", mainController.notFoundHandler);
router.use(mainController.errorHandler);

module.exports = router;
