'use strict';
var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var GoodListApp = util.getSharedComponent("goodlist");

function formatGoodsInfo(result){
    var goodsList = [];
    var productNames = [];
    var brandNames=[];
    var categoryNames=[];

    if(result.cbls.length) {
        result.cbls.map((v)=>{
            goodsList.push({
                smallImageUrl:'/client/asset/' + v.imageUrlWap,
                salesPrice:v.salesPrice,
                originPrice:v.originPrice,
                discounts:v.discounts,
                isSaleOut:v.localStock==="0",
                singleCode:v.singleCode,
                materTitle:v.materTitle,
                productArea:v.productArea,
                flag:'/client/asset/'+v.flag,
                activityType:v.activityType
            })
        })
    }

    if(result.productNames.length){
        result.productNames.map((v)=>{
            productNames.push({
                name:v.name
            })
        })
    }

    if(result.brandNames.length){
        result.brandNames.map((v)=>{
            brandNames.push({
                name:v.name
            })
        })
    }

    if(result.categoryNames.length){
        result.categoryNames.map((v)=>{
            categoryNames.push({
                name:v.name
            })
        })
    }

    return {
        productNames,
        brandNames,
        categoryNames,
        goodsList
    }
}

var goodList = function(req, res, next) {
    var keywords = req.body.keyword||'美国进口';
    var pageIndex = req.body.pageIndex||1;
    var sortType = req.body.sortType||1;
    var sortViewType = req.body.sortViewType||true;
    var isHaveGoods = req.body.isHaveGoods||false;

    bluebird.props({
        goods: util.fetchAPI("fetchGoodsList", {
            searchKey:keywords,
            sortType:sortType,
            sortViewType:sortViewType,
            isHaveGoods:isHaveGoods,
            currentPage: pageIndex,
            pageSize: 10
        })
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            var result = formatGoodsInfo(resp.goods.object)
            if (req.xhr === true) {
                res.json(result);
            } else {
                 
                var initialState = {
                    keywords : keywords,
                    pagination:result,
                    isFetching:false
                };

                var markup = util.getMarkupByComponent(GoodListApp({
                    initialState: initialState
                }));

                res.render('goodlist', {
                    markup: markup,
                    initialState: initialState
                })
            }
        } else {
            next(new Error(resp.msg));
        }
    },function(){
        //next(new Error("api request failed"))
    });

}



module.exports = goodList;