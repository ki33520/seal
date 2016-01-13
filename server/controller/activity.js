'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var ActivityApp = util.getSharedComponent("activity");
var config = require("../lib/config.js");

function filterResult(result){
    let list = [];
    if(result && result.length>0){
        result.map((item,i)=>{
            list.push({
                id:item.singleCode,
                title:item.title,
                salesPrice:item.salesPrice,
                originPrice:item.originPrice,
                imageUrl:config.imgServer + item.imageUrl,
                sourceName:item.sourceName,
                sourceImageUrl:config.imgServer + item.sourceImageUrl,
                wapPrice:item.wapPrice,
                phonePrice:item.phonePrice,
                localStock:item.localStock
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
            let list = [];
            let initialState = {};
           
            if(obj && obj.activityProductList){
                let totalPage = Math.ceil(obj.totalCount / pageSize);
                initialState = {
                    isFetching:false,
                    list:filterResult(obj.activityProductList),
                    imageUrl:config.imgServer + obj.imageUrl,
                    title:obj.activityName,
                    totalPage
                }
            }

            if (req.xhr === true) {
                res.json({list,isFetching:false});
            } else {
            
                let markup = util.getMarkupByComponent(ActivityApp({
                    initialState: initialState
                }));

                res.render('activity', {
                    markup: markup,
                    initialState: initialState
                })
            }
        } else {
            next(new Error(resp.msg));
        }
    },function(){
       console.log('error')
    });

}

module.exports = activity;