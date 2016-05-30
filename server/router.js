'use strict'
var express = require('express');
var multer  = require('multer');
var router = express.Router();

require("babel-core/register")({
    optional:["runtime"],
    // presets: ["react","es2015"],
    extensions: [".es6", ".es", ".jsx"]
});

var urlPrefix = require("./lib/config").urlPrefix
var mainController = require("./controller/main");

router.get(urlPrefix + "/logingateway",require("./controller/authorize").loginGateway);
router.get(urlPrefix + "/logoutgateway",mainController.requireAuthorize,require("./controller/authorize").logoutGateway);

router.get(urlPrefix + "",mainController.checkVisitor,mainController.staticize,require("./controller/index.js").index);
router.get(urlPrefix + "/channel", require("./controller/index.js").channel);
router.get(urlPrefix + "/searchhotwords", require("./controller/index.js").searchHotWords);
router.get(urlPrefix + "/searchhistory", require("./controller/index.js").searchHistory);
router.get(urlPrefix + "/purgesearchhistory", require("./controller/index.js").purgeSearchHistory);
router.post(urlPrefix + "/searchassociate", require("./controller/index.js").searchAssociate);
router.get(urlPrefix + "/activitygood", require("./controller/index.js").activityGood);
router.get(urlPrefix + "/updategoods",require("./controller/index.js").updateGoods);
router.get(urlPrefix + "/topic/:id.html",mainController.checkVisitor, mainController.staticize,mainController.weixinConfig, require("./controller/topic.js").topic);
router.get(urlPrefix + "/flashbuy/:id.html",mainController.checkVisitor, mainController.staticize,mainController.weixinConfig, require("./controller/flashbuy.js"));
router.get(urlPrefix + "/polymer.html",mainController.checkVisitor, mainController.staticize,require("./controller/polymer").polymer);
router.get(urlPrefix + "/categorybrands", require("./controller/polymer").categoryBrands);
router.get(urlPrefix + "/allbrands", require("./controller/polymer").allBrands);
router.get(urlPrefix + "/allorigins", require("./controller/polymer").allOrigins);
router.get(urlPrefix + "/categoryactivity", require("./controller/polymer").categoryActivity);

router.get(urlPrefix + "/sp-:id.html",mainController.checkVisitor,mainController.authorizeLocals,mainController.weixinConfig, require("./controller/gooddetail").goodDetail);
router.get(urlPrefix + "/addcart", require("./controller/gooddetail").addCart);
router.get(urlPrefix + "/togglecollected", require("./controller/gooddetail").toggleCollected);
router.get(urlPrefix + "/iscollected", require("./controller/gooddetail").isCollected);
router.get(urlPrefix + "/search/s.html", require("./controller/goodlist"));
router.get(urlPrefix + "/goodcomment", require("./controller/gooddetail").goodComments);
router.get(urlPrefix + "/cartcount", require("./controller/gooddetail").cartCount);

router.get(urlPrefix + "/activity/:id.html",mainController.checkVisitor,mainController.staticize,mainController.weixinConfig,require("./controller/activity"));
router.get(urlPrefix + "/trendy.html",mainController.checkVisitor,mainController.staticize, require("./controller/trendy").trendy);
router.post(urlPrefix + "/trendyActivity",require("./controller/trendy").activity);

router.get(urlPrefix + "/cart.html",mainController.checkVisitor,mainController.authorizeLocals,require("./controller/cart").cart);
router.post(urlPrefix + "/updatecart",require("./controller/cart").updateCart);
router.post(urlPrefix + "/deletecart",require("./controller/cart").deleteCart);
router.post(urlPrefix + "/fetchcart",require("./controller/cart").fetchCart);
router.post(urlPrefix + "/checkcart",mainController.requireAuthorize,require("./controller/cart").checkCart);
router.post(urlPrefix + "/reloadcart",mainController.requireAuthorize,require("./controller/cart").reloadCart);

router.get(urlPrefix + "/shipfee",mainController.requireAuthorize,require("./controller/confirmorder").shipFee);
router.get(urlPrefix + "/paygateway/:param",mainController.requireAuthorize,require("./controller/confirmorder").payGateway);
router.get(urlPrefix + "/confirmorder/:param.html",mainController.requireAuthorize,require("./controller/confirmorder").confirmOrder);
router.post(urlPrefix + "/submitorder",mainController.requireAuthorize,require("./controller/confirmorder").submitOrder);
router.post(urlPrefix + "/verifyorder",mainController.requireAuthorize,require("./controller/confirmorder").verifyOrder);
router.get(urlPrefix + "/orderlist.html",mainController.requireAuthorize,require("./controller/orderlist"));
router.get(urlPrefix + "/orderlist/:id.html",mainController.requireAuthorize,require("./controller/orderlist"));
router.get(urlPrefix + "/orderdetail/:id.html",mainController.requireAuthorize,require("./controller/orderdetail").orderDetail);
router.post(urlPrefix + "/closedorder",mainController.requireAuthorize,require("./controller/orderdetail").orderClose);
router.post(urlPrefix + "/deliveryorder",mainController.requireAuthorize,require("./controller/orderdetail").orderDelivery);
router.post(urlPrefix + "/savecomment",mainController.requireAuthorize,require("./controller/orderdetail").comments);
router.get(urlPrefix + "/logistics",mainController.requireAuthorize,require("./controller/orderdetail").logistics);

router.get(urlPrefix + "/activity/checkout/:id.html",mainController.requireAuthorize,require("./controller/checkout").confirmOrder);
router.post(urlPrefix + "/activity/submitorder",mainController.requireAuthorize,require("./controller/checkout").submitOrder);

router.get(urlPrefix + "/aboutus.html", require("./controller/aboutus"));
router.get(urlPrefix + "/help.html", require("./controller/help").index);
router.get(urlPrefix + "/question", require("./controller/help").question);
router.post(urlPrefix + "/sendfeedback", require("./controller/help").sendFeedback);

router.get(urlPrefix + "/membercenter.html",mainController.authorizeLocals,require("./controller/membercenter"));
router.get(urlPrefix + "/collect.html",mainController.requireAuthorize,require("./controller/membercollect"));
router.get(urlPrefix + "/comment.html",mainController.requireAuthorize,require("./controller/membercomment").index);
router.get(urlPrefix + "/showcomment",mainController.requireAuthorize,require("./controller/membercomment").showComment);
router.get(urlPrefix + "/update.html",mainController.requireAuthorize,require("./controller/memberupdate").update);

router.post(urlPrefix + "/updatebasic",mainController.requireAuthorize,require("./controller/memberupdate").updateBasic);
router.post(urlPrefix + "/updatepassword",mainController.requireAuthorize,require("./controller/memberupdate").updatePassword);
router.post(urlPrefix + "/updatemembercard",mainController.requireAuthorize,require("./controller/memberupdate").updateMembercard);
router.post(urlPrefix + "/updatemembercardverifycode",mainController.requireAuthorize,require("./controller/memberupdate").updateMemberCardVerifyCode);

router.get(urlPrefix + "/receiver.html",mainController.requireAuthorize,require("./controller/receiver").receiver);
router.get(urlPrefix + "/addreceiver",mainController.requireAuthorize,require("./controller/receiver").addReceiver);
router.get(urlPrefix + "/receiver/:id",mainController.requireAuthorize,require("./controller/receiver").receiverById);
router.get(urlPrefix + "/receivers",mainController.requireAuthorize,require("./controller/receiver").receiverByUser);
router.get(urlPrefix + "/cascadearea",mainController.requireAuthorize,require("./controller/receiver").cascadeArea);
router.post(urlPrefix + "/savereceiver",mainController.requireAuthorize,require("./controller/receiver").saveReceiver);
router.post(urlPrefix + "/createreceiver",mainController.requireAuthorize,require("./controller/receiver").createReceiver);
router.post(urlPrefix + "/deletereceiver",mainController.requireAuthorize,require("./controller/receiver").deleteReceiver);
router.post(urlPrefix + "/setdefaultreceiver",mainController.requireAuthorize,require("./controller/receiver").setDefaultReceiver);

router.get(urlPrefix + "/coupon.html",mainController.requireAuthorize, require("./controller/coupon").list);

router.get(urlPrefix + "/idcard.html",mainController.requireAuthorize,require("./controller/idcard").idcardList);
router.post(urlPrefix + "/deleteidcard",mainController.requireAuthorize, require("./controller/idcard").deleteIdcard);
router.post(urlPrefix + "/updateidcard",mainController.requireAuthorize, require("./controller/idcard").updateIdcard);
router.post(urlPrefix + "/addidcard",mainController.requireAuthorize, require("./controller/idcard").addIdcard);
router.post(urlPrefix + "/uploadidcardimage",multer().any(),require("./controller/idcard").uploadIdcardImage);

router.get(urlPrefix + "/test",mainController.test);
router.post("/api/v1/build/index",require("./controller/api").buildIndexPage);
router.post("/api/v1/publish/index",require("./controller/api").publishIndexPage);
router.all("/mock/api/:api",require("./mock/api").all);
router.all("*", mainController.notFoundHandler);

module.exports = router;
