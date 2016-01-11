'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util");
var OrderListApp = util.getSharedComponent("orderlist");

const statusArr = ["a", "b", "c", "d", "e"];

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
    var pageSize = 3;
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
            var orders = {},
                order = {},
                object = ret.orderByUser.object,
                index = statusArr[status];
            order.totalCount = object.totalCount;
            order.list = object.result ? _.slice(formatComment(object.result),0,pageIndex*pageSize) : [];
            order.pageIndex = pageIndex;
            order.pageSize = pageSize;
            orders[index] = order;
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