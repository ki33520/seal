'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var ActivityApp = util.getSharedComponent("activity");
var config = require("../lib/config.js");

function getSalesPrice(goods){
    if(goods.wapPrice > 0){
        return goods.wapPrice;
    }else if(goods.mobilePrice > 0){
        return goods.mobilePrice;
    }else{
        return goods.salesPrice;
    }
}
function filterResult(result){
    let list = [];
    if(result && result.length>0){
        result.map((item,i)=>{
            list.push({
                id:item.singleCode,
                title:item.title,
                salesPrice:getSalesPrice(item),
                originPrice:item.originPrice,
                imageUrl:config.imgServer + item.imageUrl,
                sourceName:item.sourceName,
                sourceImageUrl:config.imgServer + item.sourceImageUrl,
                isSaleOut:item.localStock > 0 ? false : true,
                isFlashPrice:item.wapPrice > 0 ? true : false,
                isMobilePrice:item.mobilePrice>0? true:false
            })
        })
    }
    return list;
}

var activity = function(req, res, next) {

    let pageIndex = req.query.pageIndex || 1;
    let pageSize = 12;
    let activityId = req.params.id;
 
    bluebird.props({
        goods: util.fetchAPI("specialActivity", {
            activityId:activityId,
            start: pageIndex,
            limit: pageSize
        })
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            let obj = resp.goods.object;
            let activityProductList = obj ? obj.activityProductList : [];
            let list = filterResult(activityProductList);

            if (req.xhr === true) {
                res.json({list,isFetching:false});
            }else{
                let totalPage = Math.ceil(obj.totalCount / pageSize);
                let initialState = {
                    list,
                    totalPage,
                    imageUrl:config.imgServer + obj.imageUrl,
                    title:obj.activityName,
                    isFetching:false
                };
                let markup = util.getMarkupByComponent(ActivityApp({
                    initialState: initialState
                }));

                res.render('activity', {
                    markup: markup,
                    initialState: initialState
                });
            }
        } else {
            let ErrorContent = util.getSharedComponent("common","error.jsx");
            let initialState = {
                code: "500",
                msg: resp.goods.message
            };
            let markup = util.getMarkupByComponent(ErrorContent({
                initialState: initialState
            }));

            res.render('error', {
                markup: markup,
                initialState: initialState
            });
            //next(new Error(resp.message));
        }
    },function(){
       console.log('error')
    });

}

module.exports = activity;