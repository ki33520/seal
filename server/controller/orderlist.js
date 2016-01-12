'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util");
var OrderListApp = util.getSharedComponent("orderlist");

function formatComment(object) {
   return object.map((child,i)=>{
        return child
    });
}

var orderList = function(req, res,next) {
    var user = req.session.user;
    var status = req.query.status !== undefined ? Number(req.query.status) : 0 ;
    var pageIndex = req.query.pageIndex !== undefined ? Number(req.query.pageIndex) : 1;
    var timeType = req.query.timeType !== undefined ? req.query.timeType : 0;
    var pageSize = 4;
    bluebird.props({
        orderByUser: util.fetchAPI("orderByUser", {
            memberId: 'fc6804de51c482730151e8ec0a080023',
            timeType: timeType,
            orderStatus: status,
            pageNo: pageIndex,
            pageSize: pageSize
        },false)
    }).then(function(ret) {
        if (ret.orderByUser.returnCode === 0){
            var orders = new Array(5),
                order = {},
                object = ret.orderByUser.object;
            order.totalCount = object.totalCount;
            order.list = object.result ? formatComment(object.result) : [];
            order.pageIndex = pageIndex;
            order.pageSize = pageSize;
            orders[status] = order;
            if (req.xhr === true){
                res.json({
                    orders
                });
            } else {
                var initialState = {
                    isFetched: true,
                    orders
                };
                var markup = util.getMarkupByComponent(OrderListApp({initialState:initialState}));

                res.render('orderlist', {
                    markup: markup,
                    initialState: initialState
                })
            }
        }else{
            next(new Error(ret.orders.message));
        }
    });

};

module.exports = orderList;