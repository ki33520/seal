'use strict';
var _ = require("lodash");
var util = require("../lib/util.js");
var Topic = util.getSharedComponent("topic");
var config = require("../lib/config");
 
function filterResult(goods){
    var list = [];
    if(goods && goods.length>0){
        _.each(goods,function(item){
            list.push({
                singleCode:item.singleCode,
                title:item.title,
                flashPrice:item.wapPrice,
                mobilePrice:item.mobilePrice,
                useMobilePrice:item.useMobilePrice,
                salesPrice:item.salesPrice,
                originPrice:item.originPrice,
                startTime:item.beginDateStr,
                endTime:item.endDateStr,
                sourceName:item.sourceName,
                imageUrl:config.imgServer+item.imageUrl,
                sourceImageUrl:config.imgServer+item.sourceImageUrl,
                onSale:item.version===1,
                localStock:item.stock,
            });
        });
    }
    return list;
}

var topic = function(req, res, next) {

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
            var list = filterResult(obj.activityProductList);
            if (req.xhr === true) {
                res.json(list);
            }else{
                var totalPage = Math.ceil(obj.totalCount / pageSize);
                var initialState = {
                    list,
                    totalPage,
                    imageUrl:config.imgServer + obj.bannerImageUrl,
                    title:obj.activityName
                };
                var markup = util.getMarkupByComponent(Topic({
                    initialState: initialState
                }));

                res.render('topic', {
                    markup: markup,
                    initialState: initialState
                });
            }
        } else {
            next(new Error(resp.message));
        }
    },function(){
        next(new Error('api request failed'));
    });
}

module.exports = {
    topic:topic
};