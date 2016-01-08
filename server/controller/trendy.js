'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var Trendy = util.getSharedComponent("trendy");
var config = require("../lib/config.js");

function filterItem(originalData){
    let list = [];
    if(originalData && originalData.length){
        originalData.map((g,i)=>{
            list.push({
                id:g.singleCode,
                title:g.title,
                imageUrl:config.imgServer+g.imageUrl,
                salePrice:g.salesPrice,
                originPrice:g.originPrice,
                stock:g.localStock<1,
                country:g.sourceName,
                flag:g.sourceImageUrl,
                isQuick:g.wapPrice>0
            });
        });
    }
    
    return list;
}

function filterList(originalData){
    let data={
        titles:[],
        list:[]
    }
 
    originalData.map((item,i)=>{
   
        let goods = filterItem(item.activityProductList);

        data.titles.push({
            name:item.activityName,
            id:item.id
        });

        data.list.push(goods);
    });

    return data;
}

var trendy = function(req, res, next) {

    var pageIndex = req.query.pageIndex || 1;
    bluebird.props({
        goods: util.fetchAPI("fetchTendyGoods", {
            start: pageIndex,
            Limit: 10
        })
    }).then(function(resp) {
 
        if (resp.goods.returnCode === 0) {
            let result = filterList(resp.goods.object);
 
            if (req.xhr === true) {
                res.json(result);
            } else {
                 
                var initialState = {
                    titles: result.titles,
                    list : result.list
                };

                var markup = util.getMarkupByComponent(Trendy({
                    initialState: initialState
                }));

                res.render('trendy', {
                    markup: markup,
                    initialState: initialState
                })
            }
        } else {
            next(new Error(resp.msg));
        }
    });

}

var activity = function(req, res, next) {

    let pageIndex = req.body.pageIndex || 1;
    let id = req.body.id;

    bluebird.props({
        goods: util.fetchAPI("fetchActivityTendyGoods", {
            activityId:id,
            activityType:'ACTIVITY_BK',
            start: pageIndex,
            Limit: 10
        })
    }).then(function(resp) {

        if (resp.goods.returnCode === 0) {
            let result = filterItem(resp.goods.object.result);
 
            res.json(result);
            
        } else {
            next(new Error(resp.msg));
        }
    });

}

module.exports = {
    trendy:trendy,
    activity:activity
};