'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var Trendy = util.getSharedComponent("trendy");
var filter = require("../lib/filter.js");
var pageSize = 10;
 
function filterItem(originalData){
    var list = [];
    if(originalData && originalData.length > 0){
        _.each(originalData,function(v,i){
            list.push({
                singleCode:v.singleCode,
                title:v.title,
                imageUrl:filter.imageUrl(v.imageUrl),
                salesPrice:filter.price({
                    flashPrice:v.wapPrice,
                    mobilePrice:v.mobilePrice,
                    salesPrice:v.salesPrice,
                    startTime:v.beginDateStr,
                    endTime:v.endDateStr
                }),
                originPrice:v.originPrice,
                sourceName:v.sourceName,
                sourceImageUrl:filter.imageUrl(v.sourceImageUrl),
                isSoldOut:filter.isSoldOut(v.localStock),
                saleType:filter.saleType(v)
            })
        })
    }
    return list;
}

function filterList(originalData,pageSize){
    var categories = [] 
    _.each(originalData,function(item,i){
        var category = {
            name:item.activityName,
            totalPage:Math.ceil(item.totalCount/pageSize)||0,
            id:item.id,
            pageIndex:1,
            list:filterItem(item.activityProductList)
        }
        categories.push(category)
    })
    return categories;
}

var trendy = function(req, res, next) {
    bluebird.props({
        goods: util.fetchAPI("fetchTendyGoods", {
            start: 1,
            Limit: pageSize
        })
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            let categories = filterList(resp.goods.object,pageSize);
            let initialState = {
                categories
            };
            let markup = util.getMarkupByComponent(Trendy({
                initialState: initialState
            }));
            res.render('trendy', {
                markup: markup,
                initialState: initialState
            })
        } else {
            next(new Error(resp.goods.message))
        }
    });

}

var activity = function(req, res, next) {
    let pageIndex = Number(req.body.pageIndex) || 1;
    let id = req.body.id;

    bluebird.props({
        goods: util.fetchAPI("fetchActivityTendyGoods", {
            activityId:id,
            activityType:'ACTIVITY_BK',
            start: pageIndex,
            Limit: pageSize
        })
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            let goodList = filterItem(resp.goods.object.result);
            let totalPage = Math.ceil(resp.goods.object.totalCount / pageSize);
            res.json({
                pagination:{
                    goodList:goodList,
                    totalPage:totalPage,
                    pageIndex:pageIndex
                },
                isFetched:true
            });
        } else {
            res.json({
                isFetched:false,
                errMsg:resp.goods.message
            })
        }
    });

}

module.exports = {
    trendy:trendy,
    activity:activity
};