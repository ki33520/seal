'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var Trendy = util.getSharedComponent("trendy");

function filter(originalData){
    let data={
        titles:[],
        goodsList:[]
    }

    originalData.map((item,i)=>{
        let product = item.activityProductList;
        let goods = [];

        if(product&&product.length){
            product.map((g,i)=>{
                goods.push({
                    id:g.singleCode,
                    title:g.title,
                    imageUrl:g.imageUrl,
                    salePrice:g.salesPrice,
                    originPrice:g.originPrice,
                    stock:g.localStock>0,
                    country:g.sourceName,
                    flag:g.sourceImageUrl,
                    isQuick:g.wapPrice>0
                })
            });
        }

        data.titles.push(item.activityName);
        data.goodsList.push(goods);
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
            let result = filter(resp.goods.object);
 
            if (req.xhr === true) {
                res.json(result);
            } else {
                 
                var initialState = {
                    pagination: result
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



module.exports = trendy;