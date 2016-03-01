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
                id: v.id,
                discount: v.discount,
                hasComment: v.hasComment,
                logisticsFee: filterPrice(v.logisticsFee),
                orderId: v.orderId,
                originPrice: filterPrice(v.originPrice),
                originalCost: v.originalCost,
                payableFee: filterPrice(v.payableFee),
                paymentFee: filterPrice(v.paymentFee),
                productCode: v.productCode,
                promoFee: filterPrice(v.promoFee),
                returnCount: v.returnCount,
                salesPrice: filterPrice(v.salesPrice),
                salesTotalFee: filterPrice(v.salesTotalFee),
                singleCode: v.singleCode,
                singleImageUrl: config.imgServer+v.singleImageUrl,
                singleProps: v.singleProps,
                singleTitle: v.singleTitle,
                skuCode: v.skuCode,
                tariffFee: filterPrice(v.tariffFee),
                qty: v.qty,
                abroadFee: filterPrice(v.abroadFee),
                couponFee: filterPrice(v.couponFee),
                updatedAt: v.updatedAt
            }
        });
        return {
            orderId: child.id,
            itemList: itemList,
            memberId: child.memberId,
            orderCrtTime: child.orderCrtTime,
            orderNo: child.orderNo,
            orderReceiveId: child.orderReceiveId,
            orderStatus: child.orderStatus,
            payableFee: filterPrice(child.payableFee),
            paymentFee: filterPrice(child.paymentFee),
            payType: child.payType,
            promoFee: filterPrice(child.promoFee),
            promoName: child.promoName,
            promoType: child.promoType,
            salesTotalFee: filterPrice(child.salesTotalFee),
            sendWarehouseId: child.sendWarehouseId,
            sendWarehouseName: child.sendWarehouseName,
            tariffFee: filterPrice(child.tariffFee),
            totalFee: filterPrice(child.totalFee),
            createdAt: child.createdAt,
            timeoutTime: child.timeoutTime
        };
    });
}
function formatComment(object) {
   return object.map((child,i)=>{
        var itemList = child.itemList.map((v,k)=>{
            return {
                singleImageUrl: config.imgServer+v.singleImageUrl,
                singleTitle: v.singleTitle,
                salesPrice: v.salesPrice
            }
        });
        return {
            orderStatus: child.orderStatus,
            salesTotalFee: child.salesTotalFee,
            paymentFee: child.paymentFee,
            orderId: child.id,
            createdAt: child.createdAt,
            itemList: itemList
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
        fetchObj;
    if(status === 4){
        fetchString = "orderWaitComments";
        fetchObj = {
            memberId: user.memberId,
            pageNo: pageIndex,
            pageSize: pageSize
        }
    }else{
        fetchString = "orderByUser";
        fetchObj = {
            memberId: user.memberId,
            timeType: timeType,
            orderStatus: status,
            pageNo: pageIndex,
            pageSize: pageSize
        }
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
            if(status === 4){
                order.list = object.result ? formatComment(object.result) : [];
            }else{
                order.list = object.result ? formatOrder(object.result) : [];
            }
            
            orders[status] = order;

            if (req.xhr === true){
                res.json({
                    isFetched: true,
                    orders,
                    flag: status,
                    systemTime: systemTime
                });
            } else {
                var initialState = {
                    isFetched: true,
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