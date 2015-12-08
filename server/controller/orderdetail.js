'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util");
var OrderDetail = util.getSharedComponent("orderdetail");

var orderStatus = [
    // {value:"STATUS_NOT_PAY",text:"待付款",active:false}
    {
        value: "STATUS_WAIT_CONFIRM",
        text: '待审核',
        active: false
    }, {
        value: "STATUS_CONFIRMED",
        text: '待发货',
        active: false
    }, {
        value: "STATUS_OUT_HOUSE",
        text: '待收货',
        active: false
    }, {
        value: "STATUS_SENDED",
        text: '已签收',
        active: false
    }, {
        value: "STATUS_FINISHED",
        text: '已完成',
        active: false
    }
]

var payType = [{
    value: "1",
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


var orderDetail = function(req, res) {
    var config = req.app.locals.config;
    var id = req.params.id;
    util.apiRequest(config.api.orderById.url, {
        orderId: id
    }).then(function(resp) {
        if (resp.code === "success") {
            var order = resp.object;
            // _.map(order.orderItemList, function(v, k) {
            //     var props = v.skuProps.split(';');
            //     v.size = props[0] ? props[0] : '';
            //     v.color = props[1] ? props[1] : '';
            //     return v;
            // })
            if (order.statusCode == 'STATUS_NOT_PAY' ||
                order.statusCode == 'STATUS_CANCELED') {
                order.canFlow = false;
            }
            _.each(orderStatus, function(v, k) {
                if (v.value === order.statusCode) {
                    _.map(orderStatus.slice(0, k), function(value) {
                        value.active = true
                        return value;
                    })
                }
            });
            order.orderStatus = orderStatus

            _.each(payType, function(v, k) {
                if (v.value === order.mainPayType) {
                    order.paymentType = v.text;
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
