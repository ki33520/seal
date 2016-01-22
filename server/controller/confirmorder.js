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
        "qtys","promoName"
    ]);
    _order["warehouse"] = order.warehouseName
    _order["totalFee"] = order.totalFee
    _order["productFee"] = order.salesTotalFee
    _order["tariffFee"] = order.promoFee
    _order["abroadFee"] = order.abroadFee ? order.abroadFee : "0.0"
    _order["shipFee"] = order.logisticsFee ? order.logisticsFee : "0.0"
    _order["couponFee"] = "0.0"
    _order["promoFee"] = order.promoFee

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
    checkedReceiver = (_order["receivers"].length > 0 && checkedReceiver === undefined) && _order["receivers"][0]
    _order["checkedReceiver"] = checkedReceiver ? checkedReceiver : null
    _order["coupons"] = formatCoupons(order.couponList)
        // console.log('order',_order)
        // order.coupons = formatCoupons(originResp.couponList)
    return _order;
}

function formatCoupons(coupons) {
    var _coupons = []
    coupons = _.sortBy(coupons, function(coupon) {
        return moment(new Date(coupon["startTime"])).format("X")
    })
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
            var initialState = {
                isFetched: true,
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

var submitOrder = function(req, res, next) {
    var user = req.session.user;
    var itemIds = req.body.itemIds;
    var buyeds = req.body.buyeds;
    var couponNo = req.body.couponNo;
    var receiverId = req.body.receiverId;
    var couponFee = req.body.couponFee;
    var totalFee = req.body.totalFee;
    // console.log({
    //     memberId: user.memberId,
    //     itemCodes: receiverId,
    //     qtys: buyeds,
    //     couponNo: couponNo,
    //     payPwd: payPassword,
    //     ticketActive: ticketActive,
    //     balanceActive: balanceActive,
    //     memberDlvAddressId:receiverId,
    //     logisticTime:logisticTime,
    //     invoiceId:invoiceId
    // })
    util.fetchAPI("saveOrder", {
        memberId: user.memberId,
        singleCodes: itemIds,
        qtys: buyeds,
        couponNo: couponNo,
        memberDlvAddressId: receiverId,
        couponFee: couponFee,
        paymentFee: totalFee
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
    var message = util.decodeURLParam(req.params["param"])
    console.log('message',message)
    var user = req.session.user;
    var orderStatusURL = util.getAPIURL("orderStatus", {
        orderNo: message.orderNo
    })
    var urlObj = {
        protocol: req.protocol,
        host: req.headers.host,
        pathname: "/"
    }
    var homeURL = url.format(urlObj)
    urlObj["pathname"] = "/orderdetail/" + message.orderNo;
    var orderDtailURL = url.format(urlObj)
    _.extend(message, {
        wxOpenId: user.wxOpenId,
        subject: "haiwaigouH5",
        createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment().add(2, "h").format("YYYY-MM-DD HH:mm:ss"),
        appName: "haiwaigou",
        homeURL: homeURL,
        orderStatusURL: orderStatusURL,
        orderDtailURL: orderDtailURL,
        version: "NEW"
    })
    message = JSON.stringify({
        "message": message
    })
    var t = moment().format("X")
    var param = {
        appId: config.appId,
        channel: "Mobile",
        openId: user.openId,
        t:t,
        terminalType: "H5",
        message:message
    }
    var h = util.getSignatureByParam(param,config.appKey)
    param["h"] = h
    res.json({
        isFetched:true,
        result:param
    })
}

module.exports = {
    confirmOrder: confirmOrder,
    submitOrder: submitOrder,
    payGateway:payGateway
};
