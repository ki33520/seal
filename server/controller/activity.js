'use strict';
var _ = require("lodash");
var util = require("../lib/util.js");
var ActivityApp = util.getSharedComponent("activity");
var config = require("../lib/config");
var imgServer = config.imgServer;

function filterResult(goods){
    var list = [];
    _.isArray(goods) && _.forEach(goods,function(item){
        list.push({
            singleCode:item.singleCode,
            title:item.title,
            flashPrice:item.wapPrice,
            mobilePrice:item.mobilePrice,
            salesPrice:item.salesPrice,
            originPrice:item.originPrice,
            startTime:item.beginDateStr,
            endTime:item.endDateStr,
            sourceName:item.sourceName,
            imageUrl:(item.picList && item.picList.length > 0)?imgServer+item.picList[0].url:null,
            sourceImageUrl:imgServer+item.sourceImageUrl,
            localStock:item.stock,
            onSale:item.version===1,
            useMobilePrice:item.useMobilePrice
        });
    });
    return list;
}

var activity = function(req, res, next) {
    var pageSize = 12;
    var pageIndex = req.query.pageIndex || 1;
    var activityId = req.params.id;
 
    util.fetchCachedAPI("specialActivity", {
        activityId:activityId,
        start: pageIndex,
        limit: pageSize
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            var obj = resp.object;
            var activityList = filterResult(obj.activityProductList);
            if (req.xhr === true) {
                res.json({
                    activityList:activityList,
                    isFetched:true
                });
            }else{
                var totalPage = Math.ceil(obj.totalCount / pageSize);
                var initialState = {
                    activityList:activityList,
                    totalPage:totalPage,
                    imageUrl:imgServer + obj.bannerImageUrl,
                    activityName:obj.activityName
                };
                var markup = util.getMarkupByComponent(ActivityApp({
                    initialState: initialState
                }));

                res.render('activity', {
                    markup: markup,
                    initialState: initialState
                });
            }
        } else {
            if (req.xhr === true) {
                res.json({
                    activityList:[],
                    isFetched:false
                });
            }else{
                next(new Error(resp.message));
            }
        }
    },function(){
        next(new Error('api request failed'));
    });
}

module.exports = activity;