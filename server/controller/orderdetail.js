'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util");
var config = require("../lib/config.js");
var OrderDetail = util.getSharedComponent("orderdetail");

var orderStatus = [
    {
        value: "STATUS_NOT_PAY",
        text:"待付款",
        active:false
    }, {
        value: "STATUS_CONFIRMED",
        text: "待发货",
        active: false
    }, {
        value: "STATUS_OUT_HOUSE",
        text: "待收货",
        active: false
    }, {
        value: "STATUS_FINISHED",
        text: "已完成",
        active: false
    }
];

var payType = [{
    value: "ALIPAYGLOBAL",
    text: "支付宝"
}, {
    value: "2",
    text: "银联支付"
}, {
    value: "3",
    text: "账户金额支付"
}, {
    value: "4",
    text: "财付通"
}, {
    value: "5",
    text: "余额现金支付"
}, {
    value: "6",
    text: "余额非现金支付"
}, {
    value: "7",
    text: "折扣券"
}, {
    value: "8",
    text: "移动和包支付"
}, {
    value: "9",
    text: "电子券支付"
}, {
    value: "10",
    text: "微信支付"
}]

function formatComment(object) {
    var itemList = object.itemList.map((v,k)=>{
        return {
            id: v.id,
            singleTitle: v.singleTitle,
            singleCode: v.singleCode,
            salesPrice: v.salesPrice,
            originPrice: v.originPrice,
            discount: v.discount,
            qty: v.qty,
            abroadFee: v.abroadFee,
            tariffFee: v.tariffFee,
            salesTotalFee: v.salesTotalFee,
            couponFee: v.couponFee,
            singleImageUrl: config.imgServer+v.singleImageUrl
        }
    });
    var receiverObject = {
        receiverName: object.receiverObject.receiverName,
        receiverMobile: object.receiverObject.receiverMobile,
        receiverProvince: object.receiverObject.receiverProvince,
        receiverCity: object.receiverObject.receiverCity,
        receiverDistrict: object.receiverObject.receiverDistrict,
        receiverAddress: object.receiverObject.receiverAddress,
        completeAddress: object.receiverObject.completeAddress
    }
    var order = {
        orderId: object.id,
        orderNo: object.orderNo,
        orderCrtTime: object.orderCrtTime,
        timeoutTime: object.timeoutTime,
        sendTime: object.sendTime,
        takeTime: object.takeTime,
        orderStatus: object.orderStatus,
        sendWareHouseName: object.sendWarehouseName,
        completeAddress: object.completeAddress,
        payType: object.payType,
        timeoutTime: object.timeoutTime,
        salesTotalFee: object.salesTotalFee,
        promoFee: object.promoFee,
        abroadFee: object.abroadFee,
        logisticsFee: object.logisticsFee,
        tariffFee: object.tariffFee,
        couponFee: object.couponFee,
        paymentFee: object.paymentFee,
        itemList: itemList,
        receiverObject: receiverObject,
        supplierName: object.supplierName
    }
    if (order.orderStatus == 'STATUS_NOT_PAY' || order.orderStatus == 'STATUS_CANCELED') {
        order.canFlow = false;
    }
    _.each(orderStatus, function(v, k) {
        if (v.value === order.orderStatus) {
            _.map(orderStatus.slice(0, k), function(value) {
                value.active = true
                return value;
            })
        }
    });
    order.orderStatusArr = orderStatus;
    _.each(payType, function(v, k) {
        if (v.value === order.payType) {
            order.payType = v.text;
        }
    });
    switch (order.logisticsTime) {
        case "NOLIMIT":
            order.shiptime = "工作日,双休日及节假日均可送货";
        case "WORKDAY":
            order.shiptime = "仅周一至周五送货";
        case "EXCEPTWORKDAY":
            order.shiptime = "仅双休日及节假日送货";
    }
    order.productFee = order.salesTotalFee;

    return order;
}

var orderDetail = function(req, res) {
    var id = req.params.id;
    util.fetchAPI("orderById", {
        orderNo: id
    },false).then(function(resp) {
        if (resp.returnCode === 0) {
            var order = formatComment(resp.object);
            
            // if(order.promoTotal > 0){
            //     order.totalFee = order.totalFee + order.promoTotal;
            // }
            var initialState = {
                isFetched: true,
                order: order
            };
            var markup = util.getMarkupByComponent(OrderDetail({
                initialState: initialState
            }));
            res.render('orderdetail', {
                markup: markup,
                initialState: initialState
            })
        }else{
            next(new Error(resp.orders.message));
        }
    })
}

var logistics = function(req, res) {
    var config = req.app.locals.config;
    var user = req.session.user;
    var orderNo = req.query.orderno;

    util.apiRequest(config.api.logisticsByOrder.url, {
        loginToken: user.memberId,
        orderNo: orderNo
    }).then(function(resp) {
        if (resp.code === "success") {
            res.json(resp)
        }
    })
}

module.exports = {
    orderDetail: orderDetail,
    logistics: logistics
};
