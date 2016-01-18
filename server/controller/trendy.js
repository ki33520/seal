'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var Trendy = util.getSharedComponent("trendy");
var config = require("../lib/config.js");
var pageSize = 10;

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

function filterList(originalData,pageSize){
    let data={
        category:[],
        totalPages:[]
    }
 
    originalData.map((item,i)=>{
        let total = Math.ceil(item.totalCount/pageSize)||0;
        let goods = filterItem(item.activityProductList);

        data.category.push({
            name:item.activityName,
            id:item.id,
            list:goods
        });

        data.totalPages.push(total);
    });

    return data;
}

var trendy = function(req, res, next) {
    bluebird.props({
        goods: util.fetchAPI("fetchTendyGoods", {
            start: 1,
            Limit: pageSize
        })
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            let result = filterList(resp.goods.object,pageSize);
            
            let initialState = {
                category: result.category,
                totalPages:result.totalPages,
                pageIndexs:[1]
            };

            let markup = util.getMarkupByComponent(Trendy({
                initialState: initialState
            }));

            res.render('trendy', {
                markup: markup,
                initialState: initialState
            })
            
        } else {
            next(new Error(resp.msg));
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
            res.json({goodList,totalPage,pageIndex});
        } else {
            next(new Error(resp.msg));
        }
    });

}

module.exports = {
    trendy:trendy,
    activity:activity
};