'use strict';

var _ = require("lodash");
var util = require("../lib/util.js");
var Trendy = util.getSharedComponent("trendy");
var config = require("../lib/config");
 
function filterItem(originalData){
    var list = [];
    if(originalData && originalData.length > 0){
        _.each(originalData,function(v){
            list.push({
                singleCode:v.singleCode,
                title:v.title,
                imageUrl:config.imgServer+v.imageUrl,
                flashPrice:v.wapPrice,
                mobilePrice:v.mobilePrice,
                salesPrice:v.salesPrice,
                startTime:v.beginDateStr,
                endTime:v.endDateStr,
                originPrice:v.originPrice,
                sourceName:v.sourceName,
                sourceImageUrl:config.imgServer+v.sourceImageUrl,
                localStock:v.stock,
                onSale:v.version===1,
                useMobilePrice:!!v.useMobilePrice
            })
        })
    }
    return list;
}

function filterList(originalData,pageSize){
    var categories = [] 
    _.each(originalData,function(item){
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
    var pageSize = 10;
    function render(resp){
        var categories = filterList(resp.object,pageSize);
        var initialState = {
            categories:categories,
            isFetched:true
        };
        var markup = util.getMarkupByComponent(Trendy({
            initialState: initialState
        }));
        res.render('trendy', {
            markup: markup,
            initialState: initialState
        })
    }
    util.fetchCachedAPI("fetchTendyGoods", {
        start: 1,
        Limit: pageSize
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            render(resp)
        } else {
            next(new Error(resp.message))
        }
    },function(){
        render(util.recoveryFromStorage("fetchTendyGoods",{
            start: 1,
            Limit: pageSize
        }))
    });
}

var activity = function(req, res, next) {
    var pageIndex = Number(req.body.pageIndex) || 1;
    var id = req.body.id;
    var pageSize = 10;
    function respond(resp){
        var goodList = filterItem(resp.object.result);
        var totalPage = Math.ceil(resp.object.totalCount / pageSize);
        res.json({
            pagination:{
                goodList:goodList,
                totalPage:totalPage,
                pageIndex:pageIndex
            },
            isFetched:true
        });
    }
    util.fetchCachedAPI("fetchActivityTendyGoods", {
        activityId:id,
        activityType:'ACTIVITY_BK',
        start: pageIndex,
        Limit: pageSize
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            respond(resp)
        } else {
            res.json({
                isFetched:false,
                errMsg:resp.message
            });
        }
    },function(){
        respond(util.recoveryFromStorage("fetchActivityTendyGoods",{
            activityId:id,
            activityType:'ACTIVITY_BK',
            start: pageIndex,
            Limit: pageSize
        }))
    });

}

module.exports = {
    trendy:trendy,
    activity:activity
};