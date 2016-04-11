'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util");
var config = require("../lib/config.js");
var OrderListApp = util.getSharedComponent("orderlist");

function filterPrice(param){
    return param === null || param === "null" ? 0 : param; 
}
function formatOrder(object) {
   return object.map((child,i)=>{
        var itemList = child.itemList.map((v,k)=>{
            return {
                hasComment: v.hasComment,
                singleImageUrl: config.imgServer+v.singleImageUrl,
                singleTitle: v.singleTitle,
                salesPrice: v.salesPrice
            }
        });
        return {
            orderNo: child.orderNo,
            orderStatus: child.orderStatus,
            salesTotalFee: child.salesTotalFee,
            paymentFee: child.paymentFee,
            orderId: child.id,
            itemList: itemList,
            createdAt: child.createdAt,
            timeoutTime: child.timeoutTime
        };
    });
}

var orderList = function(req, res,next) {
    var user = req.session.user;
    var id = req.params.id ? Number(req.params.id) : 0;
    var status = req.query.status !== undefined ? Number(req.query.status) : id ;
    var pageIndex = req.query.pageIndex !== undefined ? Number(req.query.pageIndex) : 1;
    var timeType = req.query.timeType !== undefined ? req.query.timeType : 0;
    var pageSize = 5;
    var fetchString,
        fetchObj = {memberId: user.memberId, pageNo: pageIndex, pageSize: pageSize};
    if(status === 4){
        fetchString = "orderWaitComments";
    }else{
        fetchString = "orderByUser";
        fetchObj = Object.assign(fetchObj,{timeType: timeType,orderStatus: status});
    }
    
    bluebird.props({
        orderByUser: util.fetchAPI(fetchString, fetchObj,false),
        timestamp: util.fetchAPI("timestamp",{},false)
    }).then(function(resp) {
        if (resp.orderByUser.returnCode === 0 && resp.timestamp.returnCode === 0){
            var orders = new Array(5),
                order = {},
                object = resp.orderByUser.object,
                systemTime = resp.timestamp.systemTime;
            order.pageIndex = pageIndex;
            order.pageSize = pageSize;
            order.totalCount = object.totalCount;
            order.pageCount = Math.ceil(order.totalCount/pageSize);
            order.list = object.result ? formatOrder(object.result) : [];
            order.isFetched = true;
            order.isFetching = false;
            orders[status] = order;

            if (req.xhr === true){
                res.json({
                    isFetched: true,
                    cashier: config["cashier"],
                    orders,
                    flag: status,
                    systemTime: systemTime
                });
            } else {
                var initialState = {
                    isFetched: true,
                    cashier: config["cashier"],
                    orders,
                    flag: status,
                    systemTime: systemTime
                };
                var markup = util.getMarkupByComponent(OrderListApp({initialState:initialState}));

                res.render('orderlist', {
                    markup: markup,
                    initialState: initialState
                })
            }
        }else{
            if(resp.orderByUser.returnCode !== 0){
                next(new Error(resp.orderByUser.message));
            }
            if(resp.timestamp.returnCode !== 0){
                next(new Error(resp.timestamp.message));
            }
        }
    });

};

module.exports = orderList;