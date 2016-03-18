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

router.get("/",require("./controller/index.js").index);
router.get("/channel", require("./controller/index.js").channel);
router.get("/searchhotwords", require("./controller/index.js").searchHotWords);
router.get("/searchhistory", require("./controller/index.js").searchHistory);
router.get("/purgesearchhistory", require("./controller/index.js").purgeSearchHistory);
router.post("/searchassociate", require("./controller/index.js").searchAssociate);
router.get("/activitygood", require("./controller/index.js").activityGood);
router.get("/updategoods",require("./controller/index.js").updateGoods);
router.get("/topic/:id", require("./controller/topic.js").topic);
router.get("/flashbuy/:id", require("./controller/flashbuy.js"));
router.get("/polymer",mainController.staticize,require("./controller/polymer").polymer);
router.get("/categorybrands", require("./controller/polymer").categoryBrands);
router.get("/allbrands", require("./controller/polymer").allBrands);
router.get("/allorigins", require("./controller/polymer").allOrigins);
router.get("/categoryactivity", require("./controller/polymer").categoryActivity);

router.get("/gooddetail/:id",mainController.authorizeLocals, require("./controller/gooddetail").goodDetail);
router.get("/addcart", require("./controller/gooddetail").addCart);
router.get("/togglecollected", require("./controller/gooddetail").toggleCollected);
router.get("/iscollected", require("./controller/gooddetail").isCollected);
router.get("/search", require("./controller/goodlist"));
router.get("/goodcomment", require("./controller/gooddetail").goodComments);
router.get("/cartcount", require("./controller/gooddetail").cartCount);

router.get("/activity/:id", require("./controller/activity"));
router.get("/trendy", require("./controller/trendy").trendy);
router.post("/trendyActivity",require("./controller/trendy").activity);

router.get("/cart",mainController.authorizeLocals,require("./controller/cart").cart);
router.post("/updatecart",require("./controller/cart").updateCart);
router.post("/deletecart",require("./controller/cart").deleteCart);
router.post("/fetchcart",require("./controller/cart").fetchCart);
router.post("/checkCart",mainController.requireAuthorize,require("./controller/cart").checkCart);

router.get("/shipfee",mainController.requireAuthorize,require("./controller/confirmorder").shipFee);
router.get("/paygateway/:param",mainController.requireAuthorize,require("./controller/confirmorder").payGateway);
router.get("/confirmorder/:param",mainController.requireAuthorize,require("./controller/confirmorder").confirmOrder);
router.post("/submitorder",mainController.requireAuthorize,require("./controller/confirmorder").submitOrder);
router.post("/verifyorder",mainController.requireAuthorize,require("./controller/confirmorder").verifyOrder);
router.get("/orderlist",mainController.requireAuthorize,require("./controller/orderlist"));
router.get("/orderlist/:id",mainController.requireAuthorize,require("./controller/orderlist"));
router.get("/orderdetail/:id",mainController.requireAuthorize,require("./controller/orderdetail").orderDetail);
router.post("/closedorder",mainController.requireAuthorize,require("./controller/orderdetail").orderClose);
router.post("/deliveryorder",mainController.requireAuthorize,require("./controller/orderdetail").orderDelivery);
router.post("/savecomment",mainController.requireAuthorize,require("./controller/orderdetail").comments);
router.get("/logistics",mainController.requireAuthorize,require("./controller/orderdetail").logistics);


router.get("/aboutus", require("./controller/aboutus"));
router.get("/help", require("./controller/help").index);
router.get("/question", require("./controller/help").question);
router.post("/sendfeedback", require("./controller/help").sendFeedback);

router.get("/membercenter",mainController.authorizeLocals,require("./controller/membercenter"));
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
router.get("/receiver/:id",mainController.requireAuthorize,require("./controller/receiver").receiverById);
router.get("/receivers",mainController.requireAuthorize,require("./controller/receiver").receiverByUser);
router.get("/cascadearea",mainController.requireAuthorize,require("./controller/receiver").cascadeArea);
router.post("/savereceiver",mainController.requireAuthorize,require("./controller/receiver").saveReceiver);
router.post("/createreceiver",mainController.requireAuthorize,require("./controller/receiver").createReceiver);
router.post("/deletereceiver",mainController.requireAuthorize,require("./controller/receiver").deleteReceiver);
router.post("/setdefaultreceiver",mainController.requireAuthorize,require("./controller/receiver").setDefaultReceiver);

router.get("/coupon",mainController.requireAuthorize, require("./controller/coupon").list);
router.get("/coupon/:id",mainController.requireAuthorize, require("./controller/coupon").detail);

router.post("/api/v1/build/index",require("./controller/api").buildIndexPage);
router.post("/api/v1/publish/index",require("./controller/api").publishIndexPage);
router.all("/mock/api/:api",require("./mock/api").all);
router.all("*", mainController.notFoundHandler);

module.exports = router;
