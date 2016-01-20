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
            orderId: v.orderId,
            hasComment: v.hasComment,
            singleTitle: v.singleTitle,
            singleCode: v.singleCode,
            salesPrice: v.salesPrice,
            originPrice: v.originPrice,
            discount: v.discount,
            qty: v.qty,
            abroadFee: v.abroadFee,
            tariffFee: v.tariffFee,
            salesTotalFee: v.salesTotalFee,
            payableFee: v.payableFee,
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
    var statusArr = [];
    orderStatus.map((v, k)=>{
        statusArr[k] = {
            value: v.value,
            text: v.text,
            active: v.active
        };
    });
    statusArr.map((v, k)=>{
        if (v.value === order.orderStatus) {
            _.map(statusArr.slice(0, k+1), function(value) {
                value.active = true
            })
        }
    });
    order.orderStatusArr = statusArr;
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

var orderDetail = function(req, res, next) {
    var id = req.params.id;
    bluebird.props({
        orderById: util.fetchAPI("orderById", {
            orderNo: id
        },false),
        timestamp: util.fetchAPI("timestamp",{},false)
    }).then(function(resp) {
        if (resp.orderById.returnCode === 0 && resp.timestamp.returnCode === 0){
            var order = formatComment(resp.orderById.object),
                systemTime = resp.timestamp.systemTime;
            // if(order.promoTotal > 0){
            //     order.totalFee = order.totalFee + order.promoTotal;
            // }
            var initialState = {
                isFetched: true,
                order: order,
                systemTime: systemTime
            };
            var markup = util.getMarkupByComponent(OrderDetail({
                initialState: initialState
            }));
            res.render('orderdetail', {
                markup: markup,
                initialState: initialState
            })
        }else{
            if(resp.orderById.returnCode !== 0){
                next(new Error(resp.orderById.message));
            }
            if(resp.timestamp.returnCode !== 0){
                next(new Error(resp.timestamp.message));
            }
        }
    })
}
var orderClose = function(req, res, next) {
    var orderNo = req.body.orderNo;
    util.fetchAPI('closedOrderById', {
        orderNo: orderNo
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            res.json({
                isChanged: true,
                orderStatus: "STATUS_CANCELED",
                msg: resp.message
            })
        }else{
            res.json({
                isChanged: false,
                msg: resp.message
            })
        }
    })
}
var orderDelivery = function(req, res, next) {
    var user = req.session.user;
    var orderNo = req.body.orderNo;
    util.fetchAPI('deliveryOrderById', {
        memberId: user.memberId,
        orderNo: orderNo
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            res.json({
                isChanged: true,
                orderStatus: "STATUS_FINISHED",
                msg: resp.message
            })
        }else{
            res.json({
                isChanged: false,
                msg: resp.message
            })
        }
    })
}
var comments = function(req, res, next) {
    var user = req.session.user;
    util.fetchAPI("commentsOrderById", {
        memberId: user.memberId,
        commentsJson: req.body.commentsJson
        //'[{rate:5,content:nice,isOpen:1,itemId:S732000000195}]'
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            res.json({
                isChanged: true,
                msg: resp.message
            })
        }else{
            res.json({
                isChanged: false,
                msg: resp.message
            })
        }
    })
}

var logistics = function(req, res, next) {
    var config = req.app.locals.config;
    var user = req.session.user;
    var orderNo = req.query.orderNo;
    util.fetchAPI("logisticsByOrder", {
        orderNo: orderNo
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            res.json(resp.object)
        }else{
            res.json({});
        }
    })
}

module.exports = {
    orderDetail: orderDetail,
    logistics: logistics,
    orderClose: orderClose,
    comments: comments,
    orderDelivery: orderDelivery
};
