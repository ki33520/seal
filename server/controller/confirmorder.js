'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var moment = require("moment");
var url = require("url");
var util = require("../lib/util");
var sharedUtil = require("../../shared/lib/util.es6");
var ConfirmOrder = util.getSharedComponent("confirmorder");
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
    var param = util.decodeURLParam(req.params["param"])
    var user = req.session.user;
    util.fetchAPI("confirmOrder", {
        memberId: user.memberId,
        singleCodes: param.itemIds,
        qtys: param.buyeds
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            var order = orderFilter(ret.object);
            _.extend(order, {
                itemIds: param.itemIds,
                buyeds: param.buyeds
            })
            order["cashier"] = config["cashier"]
            var initialState = {
                isFetched: true,
                user:user || "",
                order: order
            };
            var markup = util.getMarkupByComponent(ConfirmOrder({
                initialState: initialState
            }));

            res.render('confirmorder', {
                markup: markup,
                initialState: initialState
            })
        } else {
            next(new Error(ret.msg))
        }
    })
}

var shipFee = function(req,res,next){
    var provinceCode = req.query.provinceCode
    var cityCode = req.query.cityCode
    var districtCode = req.query.districtCode
    var warehouseId = req.query.warehouseId
    util.fetchAPI("shipFeeByReceiver",{
        warehouseId:warehouseId,
        provinceCode:provinceCode,
        cityCode:cityCode,
        countyCode:districtCode
    }).then(function(ret){
        if(ret.returnCode === 0){
            res.json({
                isFetched:true,
                result:ret.object
            })
        }else{
            res.json({
                isFetched:false,
                errMsg:ret.message
            })
        }
    },function(){
        res.json({
            isFetched:false,
            errMsg:"api request failed"
        })
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
    var itemIds = req.body.itemIds;
    var buyeds = req.body.buyeds;
    var couponNo = req.body.couponNo;
    var receiverId = req.body.receiverId;
    var couponFee = req.body.couponFee;
    var totalFee = req.body.totalFee;
    var guiderCode = req.cookies["tag"] ? req.cookies["tag"]:""
    if(guiderCode === ""){
        guiderCode = user.medrauId ? user.medrauId:""
    }

    util.fetchAPI("saveOrder", {
        memberId: user.memberId,
        singleCodes: itemIds,
        qtys: buyeds,
        couponNo: couponNo,
        memberDlvAddressId: receiverId,
        couponFee: couponFee,
        paymentFee: totalFee,
        guiderCode:guiderCode
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

var payGateway = function(req, res, next) {
    var param = util.decodeURLParam(req.params["param"])
        // console.log('param',param)
    var user = req.session.user;
    var orderStatusURL = config.api["orderStatus"].url
    var urlObj = {
        protocol: req.protocol,
        host: req.headers.host,
        pathname: "/"
    }
    var homeURL = url.format(urlObj)

    util.fetchAPI("orderByNo", {
        orderNo: param.orderNo
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            var message = messageFilter(ret.object)

            urlObj["pathname"] = config.urlPrefix + "/orderdetail/" + message.id + ".html";
            var orderDetailURL = url.format(urlObj)
            urlObj["pathname"] =config.urlPrefix + "/orderlist.html";
            var orderListURL = url.format(urlObj)


            util.fetchAPI("customByWarehouse",{
                relateIds:ret.object.sendWarehouseId
            }).then(function(resp){
                if(resp.returnCode === 0){
                    var customsCode = resp.object.customs
                    var countryType = resp.object.countryType
                    var serviceType = resp.object.serviceType
                    message["customsCode"] = customsCode
                    message["goodsOriginType"] = countryType
                    message["tradeType"] = serviceType === "2"?"08":"01"

                    var popularizeCode = req.cookies["popularizeCode"] ? req.cookies["popularizeCode"]:""
                    message["dsp"] = popularizeCode
                    _.extend(message, {
                        wxOpenId: user.wxOpenId,
                        subject: "haiwaigouH5",
                        createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                        endTime: moment().add(2, "h").format("YYYY-MM-DD HH:mm:ss"),
                        appName: "haiwaigou",
                        homeURL: homeURL,
                        orderStatusURL: orderStatusURL,
                        orderList:orderListURL,
                        orderDetailURL: orderDetailURL,
                        version: "NEW"
                    })
                    // console.log('message',message)
                    message = JSON.stringify({
                        "message": message
                    })
                    var t = moment().format("X")
                    var param = {
                        appId: config.appId,
                        channel: "Mobile",
                        openId: user.openId,
                        t: t,
                        terminalType: "H5",
                        message: message
                    }
                    var h = util.getSignatureByParam(param, config.appKey)
                    param["h"] = h
                    res.json({
                        isFetched: true,
                        result: param
                    })
                }else{
                    res.json({
                        isFetched: false,
                        errMsg: ret.message
                    })
                }
            })
        } else {
            res.json({
                isFetched: false,
                errMsg: ret.message
            })
        }
    }, function() {
        res.json({
            isFetched: false,
            errMsg: "api request failed"
        })
    })
}

function messageFilter(order) {
    var productList = []
    if (order["itemList"]) {
        _.each(order["itemList"], function(good) {
            productList.push({
                salesPrice:good.salesPrice,
                singleCode:good.singleCode,
                qty:good.qty,
                goodsName: good.singleTitle,
                goodsColorAndSize: good.singleProps
            })
        })
    }
    var _order = _.pick(order, [
        "paymentFee", "orderNo","id"
    ])
    _order["productList"] = productList

    var receiver = order.receiverObject
    _order["totalFee"] = order.paymentFee
    _order["address"] = receiver.completeAddress
    _order["userName"] = receiver.receiverName
    _order["mobile"] = receiver.receiverMobile
    // _order["credentialsNo"] = receiver.receiverCertNo
    // _order["realName"] = receiver.receiverName
    // _order["credentialsType"] = "01"
    // _order["goodsAmount"] = order.salesTotalFee
    // _order["taxAmount"] = order.tariffFee
    // _order["freight"] = order.abroadFee + order.logisticsFee
    // _order["bizTypeCode"] = 1
    // _order["paymentType"] = 0
    // _order["customsCode"] = 0
    return _order
}

module.exports = {
    confirmOrder: confirmOrder,
    shipFee:shipFee,
    verifyOrder:verifyOrder,
    submitOrder: submitOrder,
    payGateway: payGateway
};
