'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var moment = require("moment");
var util = require("../lib/util");
var ConfirmOrder = util.getSharedComponent("confirmorder");
var config = require("../lib/config");

function orderFilter(order) {
    var _order = _.pick(order,[
        "qtys"
    ]);
    _order["totalFee"] = parseFloat(order.totalFee).toFixed(1)
    _order["productFee"] = parseFloat(order.salesTotalFee).toFixed(1)
    _order["tariffFee"] = parseFloat(order.promoFee).toFixed(1)
    _order["abroadFee"] = order.abroadFee?parseFloat(order.abroadFee).toFixed(1):"0.0"
    _order["shipFee"] = order.logisticsFee?parseFloat(order.logisticsFee).toFixed(1):"0.0"
    _order["couponFee"] = "0.0"
    _order["promoFee"] = parseFloat(order.promoFee).toFixed(1)

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
    _order["receivers"] = order.memberAddrList
    _order["checkedReceiver"] = order.memberAddrList?order.memberAddrList[0]:null;
    _order["coupon"] = order.couponList
    // console.log('order',_order)
    // order.coupons = formatCoupons(originResp.couponList)
    return _order;
}

function formatCoupons(list) {
    var sortedCoupons = _.sortBy(list, function(v) {
        return -v.issueDate
    });
    _.map(sortedCoupons, function(v, k) {
        v.validityDate = moment(v.validityDate).format('YYYY-MM-DD');
        v.useDate = moment(v.useDate).format('YYYY-MM-DD');
        v.issueDate = moment(v.issueDate).format('YYYY-MM-DD');
        v.assertion = null;
        if (v.curEntity !== null) {
            v.assertion = v.curEntity.songAccount
        }
        v.flag = flagOfCoupon(v);
        return v;
    })
    return sortedCoupons;
}

function flagOfCoupon(coupon) {
    var flag;
    if (coupon.employName.length > 1) {
        flag = "general";
    }
    if (coupon.employName.length === 1) {
        switch (coupon.employName[0]) {
            case "联盟优惠券":
                flag = "legue";
                break;
            case "特品汇":
                flag = "tepin";
                break;
            case "农博汇":
                flag = "hnmall";
                break;
            case "海外购":
                flag = "oversea";
                break;
            case "线下门店":
                flag = "offline";
                break;
        }
    }
    return flag;
}

var confirmOrder = function(req, res, next) {
    var itemIds = req.body.itemIds !== undefined ? req.body.itemIds : null;
    var buyeds = req.body.buyeds !== undefined ? req.body.buyeds : null;
    var user = req.session.user;
    return next(new Error("confirmorder error"))
    // console.log(itemIds, buyeds)
    util.fetchAPI("confirmOrder", {
        memberId: "fc6804de51c482730151e8ec0a080023",
        singleCodes: itemIds,
        qtys: buyeds
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            var order = orderFilter(ret.object[0]);
            _.extend(order, {
                itemIds: itemIds,
                buyeds: buyeds
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
    util.fetchAPI("submitOrder", {
        memberId: user.memberId,
        singleCodes: itemIds,
        qtys: buyeds,
        couponNo: couponNo,
        memberDlvAddressId: receiverId,
        couponFee: couponFee,
        paymentFee: totalFee
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            var payObject = resp.payObject;
            res.json({
                orderSubmited: true,
                result: {
                    payObject: payObject,
                }
            });
        } else {
            res.json({
                orderSubmited: false,
                errMsg: resp.msg
            });
        }
    })
}

module.exports = {
    confirmOrder: confirmOrder,
    submitOrder: submitOrder
};
