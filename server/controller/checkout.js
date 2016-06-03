'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var moment = require("moment");
var url = require("url");
var util = require("../lib/util");
var sharedUtil = require("../../shared/lib/util.es6");
var Checkout = util.getSharedComponent("checkout");
var ErrorContent = util.getSharedComponent("checkout", "error.jsx");

var config = require("../lib/config");
var receiversFilter = require("./receiver").receiversFilter;

function orderFilter(order) {
    var _order = _.pick(order, [
        "qtys", "promoName","promoType","warehouseId"
    ]);
    _order["isPostageFree"] = order["hasLogistics"]
    _order["warehouse"] = order.warehouseName
    _order["totalFee"] = order.totalFee < 0.07?0.07:order.totalFee
    _order["productFee"] = order.salesTotalFee
    _order["tariffFee"] = order.tariffFee
    _order["abroadFee"] = order.abroadFee ? order.abroadFee : 0
    _order["shipFee"] = order.logisticsFee ? order.logisticsFee : 0
    _order["shipFeeAmount"] = _.add(_order["abroadFee"],_order["shipFee"])
    _order["couponFee"] = 0
    _order["promoFee"] = order.promoFee
    _order["reduceFee"]= Math.round((_order["productFee"] - _order["promoFee"]) * 100) / 100

    var promoList = []
    _.each(order.cartMKTList, function(promo, i) {
        var _promo = _.pick(promo, ["promoType", "promoName", "promoFee"])
        _promo.goods = [];
        _.each(promo.cartProductList, function(product, j) {
            _promo.goods.push({
                code: product.singleCode,
                title: product.title,
                imageUrl: config.imgServer + product.imageUrl,
                attrs: product.props,
                originPrice: product.originPrice,
                salePrice: product.salesPrice,
                discount: product.discount,
                qty: product.qty
            })
        })
        promoList.push(_promo);
    })
    _order["promoList"] = promoList
    _order["receivers"] = receiversFilter(order.memberAddrList)
    var checkedReceiver = _.findWhere(_order["receivers"], {
        isDefault: 1
    })
    if(_order["receivers"].length > 0 && checkedReceiver === undefined){
        checkedReceiver = _order["receivers"][0]
    }
    _order["checkedReceiver"] = checkedReceiver ? checkedReceiver : null
    _order["coupons"] = formatCoupons(order.couponList)
    _order["checkedCoupon"] = null
    if(_order["coupons"].length > 0){
        // console.log('coupons',_order["coupons"])
        _order["checkedCoupon"] = _order["coupons"][0]
        _order["couponFee"] = _order["checkedCoupon"]["couponFee"]
        if(_order["reduceFee"] < _order["couponFee"]){
            _order["couponFee"] = _order["reduceFee"]
        }
        // _order["totalFee"] = Math.round((_order["totalFee"] - _order["couponFee"]) * 100) / 100
        // console.log(_order["totalFee"],"totalFee")
    }
    _order["totalFee"] = calculateTotalFee(_order)
        // order.coupons = formatCoupons(originResp.couponList)
    return _order;
}

function calculateTotalFee(order){
    var productFee = (order.reduceFee - order.couponFee) < 0? 0 : (order.reduceFee - order.couponFee)
    // console.log('productFee',productFee)
    var totalFee = productFee + order.shipFee + order.abroadFee + order.tariffFee
    totalFee = Math.round(totalFee * 100) / 100
    totalFee = totalFee < 0.3 ? 0.3:totalFee
    return totalFee
}

function formatCoupons(coupons) {
    var _coupons = []
    coupons = _.sortBy(coupons,[function(coupon){
        return coupon.couponFee
    },function(coupon) {
        return moment(new Date(coupon["endTime"])).format("X")
    }],["desc","asc"])
    _.each(coupons, function(v, k) {
            v["startTime"] = moment(new Date(v["startTime"])).format("YYYY.M.D")
            v["endTime"] = moment(new Date(v["endTime"])).format("YYYY.M.D")
            _coupons.push(v)
        })
        // console.log('coupons',_coupons)
    return _coupons;
}

var confirmOrder = function(req, res, next) {
    var id = req.query["acode"]
    var user = req.session.user;
    util.fetchAPI("checkout", {
        memberId: user.memberId,
        activityOrderId:id
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            var order = orderFilter(ret.object);
            _.extend(order,{
                activityOrderId:id
            })
            order["cashier"] = config["cashier"]
            var initialState = {
                isFetched: true,
                order: order
            };
            var markup = util.getMarkupByComponent(Checkout({
                initialState: initialState
            }));
            console.log("render checkout")
            res.render('checkout', {
                markup: markup,
                initialState: initialState
            })
        } else {
            var initialState = {
                code: "500",
                msg:ret.message
            };
            var markup = util.getMarkupByComponent(ErrorContent({
                initialState: initialState
            }));

            res.render('checkout', {
                markup: markup,
                initialState: initialState
            });
            // next(new Error(ret.msg))
        }
    })
}

var verifyOrder = function(req,res,next){
    var user = req.session.user
    var itemIds = req.body.itemIds
    var buyeds = req.body.buyeds
    var couponNo = req.body.couponNo
    var totalFee = req.body.totalFee
    var receiverId = req.body.receiverId

    util.fetchAPI("verifyOrder",{
        memberId: user.memberId,
        singleCodes: itemIds,
        qtys: buyeds,
        couponNo: couponNo,
        memberDlvAddressId: receiverId,
        paymentFee:totalFee
    }).then(function(ret){
        if(ret.returnCode === 0){
            res.json({
                isVerified:true,
            })
        }else{
            res.json({
                isVerified:false,
                errCode:ret.returnCode
            })
        }
    },function(){
        res.json({
            isVerified:false,
            errCode:-1
        })
    })
}

var submitOrder = function(req, res, next) {
    var user = req.session.user;
    var receiverId = req.body.receiverId;
    var activityOrderId = req.body.activityOrderId;

    util.fetchAPI("createOrder", {
        activityOrderId:activityOrderId,
        memberId: user.memberId,
        memberDlvAddressId: receiverId
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            var orderNo = resp.object;
            var order = {
                orderNo: resp.object,
            }
            res.json({
                orderSubmited: true,
                result: order
            });
        } else {
            res.json({
                orderSubmited: false,
                errMsg: resp.message
            });
        }
    })
}

module.exports = {
    confirmOrder: confirmOrder,
    verifyOrder:verifyOrder,
    submitOrder: submitOrder,
};