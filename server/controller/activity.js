'use strict';
var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var ActivityApp = util.getSharedComponent("activity");
var filter = require("../lib/filter.js");
 
function filterResult(result){
    var list = [];
    if(result && result.length>0){
        result.map((item,i)=>{
            list.push({
                singleCode:item.singleCode,
                title:item.title,
                salesPrice:filter.price(item),
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

    var pageIndex = req.query.pageIndex || 1;
    var pageSize = 12;
    var activityId = req.params.id;
 
    bluebird.props({
        goods: util.fetchAPI("specialActivity", {
            activityId:activityId,
            start: pageIndex,
            limit: pageSize
        })
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            var obj = resp.goods.object;
            var activityProductList = obj ? obj.activityProductList : [];
            var list = filterResult(activityProductList);

            if (req.xhr === true) {
                res.json({list,isFetching:false});
            }else{
                var totalPage = Math.ceil(obj.totalCount / pageSize);
                var initialState = {
                    list,
                    totalPage,
                    imageUrl:filter.imageUrl(obj.imageUrl),
                    title:obj.activityName,
                    isFetching:false
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
    },function(){
       console.log('error')
    });

}

module.exports = activity;