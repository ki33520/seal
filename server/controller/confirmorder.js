'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var moment = require("moment");
var util = require("../lib/util");
var ConfirmOrder = util.getSharedComponent("confirmorder");

function formatOrder(originResp) {
    var order = {};
    order.totalAmount = parseFloat(originResp.price.totalPrice).toFixed(2);
    order.productFee = parseFloat(originResp.price.originPrice).toFixed(2);
    order.promoAmount = parseFloat(originResp.price.discountPrice).toFixed(2);
    order.shipFee = parseFloat(originResp.price.postage).toFixed(2);
    order.balance = 10;
    order.ticket = 10;

    var carts = {
        list: [],
        sumPrice: 0,
        discountPrice: 0,
        totalPrice: 0
    };
    _.each(originResp.marketList, function(orginalCart, i) {
        var cart = {
            mallName: orginalCart.marketName,
            mallId: orginalCart.marketId
        };
        cart.sumPrice = 0;
        cart.discountPrice = 0;
        cart.goods = [];
        _.each(orginalCart.productList, function(product, j) {
            cart.sumPrice += (product.salesPrice * product.count);
            cart.discountPrice += (product.discount * product.count);
            var props = product.attrMap;
            cart.goods.push({
                goodId: product.stock.singleCode,
                itemId: product.itemCode,
                brandId: product.brandId,
                brandName: product.brandName,
                title: product.title,
                props: props,
                originPrice: product.originPrice,
                salePrice: product.salesPrice,
                buyed: product.count,
                totalPrice: product.totalPrice,
                discountPrice: product.discountPrice,
                imageUrl: product.pic
            })
        })
        carts.sumPrice += cart.sumPrice
        carts.discountPrice += cart.discountPrice
        carts.totalPrice += (cart.sumPrice - cart.discountPrice)
        carts.list.push(cart);
    })
    order.carts = carts;
    order.checkedReceiver = _.find(originResp.addressList, {
        defaultChecked: 1
    });
    order.receivers = originResp.addressList;

    order.coupons = formatCoupons(originResp.couponList)
    return order;
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
    // var config = req.app.locals.config;
    // var cartIds = req.query.cartIds !== undefined ? req.query.cartIds : null;
    var itemIds = req.body.itemIds !== undefined ? req.body.itemIds : null;
    var buyeds = req.body.buyeds !== undefined ? req.body.buyeds : null;
    var user = req.session.user;
    // console.log(itemIds, buyeds)
    bluebird.props({
        orderByParam: util.fetchAPI("orderByParam", {
            memberId: user.memberId,
            itemIds: itemIds,
            nums: buyeds
        },true),
    }).then(function(resp) {
        if (resp.orderByParam.code === "success") {
            var order = formatOrder(resp.orderByParam);
            _.extend(order,{
                itemIds:itemIds,
                buyeds:buyeds
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
            next(new Error(resp.msg))
        }
    })
}

var submitOrder = function(req, res, next) {
    var user = req.session.user;
    var itemIds = req.body.itemIds;
    var buyeds = req.body.buyeds;
    var couponNo = req.body.couponNo;
    var ticketActive = req.body.ticketActive;
    var balanceActive = req.body.balanceActive;
    var payPassword = req.body.payPassword;
    var logisticTime = req.body.logisticTime;
    var receiverId = req.body.receiverId;
    var invoiceId = req.body.invoiceId;
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
        itemCodes: itemIds,
        qtys: buyeds,
        couponNo: couponNo,
        payPwd: payPassword,
        ticketActive: ticketActive,
        balanceActive: balanceActive,
        memberDlvAddressId:receiverId,
        logisticTime:logisticTime,
        invoiceId:invoiceId
    },true).then(function(resp) {
        if (resp.code === "success") {
            var payObject = resp.payObject;
            payObject.channel ="WAP";
            res.json({
                orderSubmited:true,
                result:{
                    payObject:payObject,
                    payUrl:resp.payurl
                }
            });
        } else {
            res.json({
                orderSubmited:false,
                errMsg:resp.msg
            });
        }
    })
}

module.exports = {
    confirmOrder: confirmOrder,
    submitOrder: submitOrder
};