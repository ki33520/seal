'use strict';
var _ = require("lodash");
var util = require("../lib/util.js");
var ActivityApp = util.getSharedComponent("activity");
var filter = require("../lib/filter.js");
 
function filterResult(goods){
    var list = [];
    if(goods && goods.length>0){
        _.each(goods,function(item,i){
            var salesPrice = filter.price({
                flashPrice:item.wapPrice,
                mobilePrice:item.mobilePrice,
                salesPrice:item.salesPrice,
                startTime:item.beginDateStr,
                endTime:item.endDateStr
            });
            list.push({
                singleCode:item.singleCode,
                title:item.title,
                salesPrice:salesPrice,
                originPrice:item.originPrice,
                imageUrl:filter.imageUrl(item.imageUrl),
                sourceName:item.sourceName,
                sourceImageUrl:filter.imageUrl(item.sourceImageUrl),
                isSoldOut:filter.isSoldOut(item.localStock),
                saleType:filter.saleType(item)
            });
        });
    }
    return list;
}

var activity = function(req, res, next) {

    var pageSize = 12;
    var pageIndex = req.query.pageIndex || 1;
    var activityId = req.params.id;
 
    util.fetchAPI("specialActivity", {
        activityId:activityId,
        start: pageIndex,
        limit: pageSize
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            var obj = resp.object;
            var activityProductList = obj ? obj.activityProductList : [];
            var list = filterResult(activityProductList);

            if (req.xhr === true) {
                res.json(list);
            }else{
                var totalPage = Math.ceil(obj.totalCount / pageSize);
                var initialState = {
                    list,
                    totalPage,
                    imageUrl:filter.imageUrl(obj.bannerImageUrl),
                    title:obj.activityName
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
            next(new Error(resp.message));
        }
    });

}

module.exports = activity;