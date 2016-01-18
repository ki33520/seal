'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var moment = require("moment");
var util = require("../lib/util");
var sharedUtil = require("../../shared/lib/util.es6");
var ConfirmOrder = util.getSharedComponent("confirmorder");
var config = require("../lib/config");
var receiversFilter = require("./receiver").receiversFilter;

function orderFilter(order) {
    var _order = _.pick(order,[
        "qtys"
    ]);
    _order["totalFee"] = order.totalFee
    _order["productFee"] = order.salesTotalFee
    _order["tariffFee"] = order.promoFee
    _order["abroadFee"] = order.abroadFee?order.abroadFee:"0.0"
    _order["shipFee"] = order.logisticsFee?order.logisticsFee:"0.0"
    _order["couponFee"] = "0.0"
    _order["promoFee"] = order.promoFee

    var promoList = []
    _.each(order.cartMKTList, function(promo, i) {
        var _promo = _.pick(promo,["promoType","promoName","promoFee"])
        _promo.goods = [];
        _.each(promo.cartProductList, function(product, j) {
            _promo.goods.push({
                code:product.singleCode,
                title:product.title,
                imageUrl:config.imgServer + product.imageUrl,
                attrs:product.props,
                originPrice:product.originPrice,
                salePrice:product.salesPrice,
                discount:product.discount,
                qty:product.qty
            })
        })
        promoList.push(_promo);
    })
    _order["promoList"] = promoList
    _order["receivers"] = receiversFilter(order.memberAddrList)
    var checkedReceiver = _.findWhere(_order["receivers"],{isDefault:1})
    checkedReceiver = (_order["receivers"].length > 0 && checkedReceiver === undefined) && _order["receivers"][0]
    _order["checkedReceiver"] = checkedReceiver?checkedReceiver:null
    _order["coupons"] = formatCoupons(order.couponList)
    // console.log('order',_order)
    // order.coupons = formatCoupons(originResp.couponList)
    return _order;
}

function formatCoupons(coupons) {
    var _coupons = []
    coupons = _.sortBy(coupons,function(coupon){
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
    // console.log(itemIds, buyeds)
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
            res.json({
                orderSubmited: true,
                orderNo:orderNo
            });
        } else {
            res.json({
                orderSubmited: false,
                errMsg:resp.message
            });
        }
    })
}

module.exports = {
    confirmOrder: confirmOrder,
    submitOrder: submitOrder
};
