'use strict';
var _ = require("lodash");
var util = require("../lib/util.js");
var GoodListApp = util.getSharedComponent("goodlist");
var config = require("../lib/config");

function filterGoodsList(result){
    var list = [];
    var imgServer = config.imgServer;
    result && _.each(result,function(v){
        list.push({
            singleCode:v.singleCode,
            flashPrice:v.flashPrice,
            mobilePrice:v.mobilePrice,
            salesPrice:v.salesPrice,
            originPrice:v.originPrice,
            startTime:v.beginDateStr,
            endTime:v.endDateStr,
            discounts:v.discounts,
            materTitle:v.materTitle,
            sourceName:v.areaName,
            smallImageUrl:imgServer+v.picUrl,
            sourceImageUrl:imgServer+v.areaLogo,
            localStock:v.localStock
        });
    });
    return list;
}

function filterNames(result){
    var list = [];
    result && _.each(result,function(item){
        list.push({
            id:item.id,
            name:item.name,
            isChecked:false
        });
    });

    return list;
}

var search = function(req, res, next) {
    var options = {
        currentPage:1,
        pageSize:10
    };
    if(req.query.k){
        var keyword = req.query.k;
        var searchhistory = util.saveSearchHistory(req.session["searchhistory"],keyword);
        options.searchKey=keyword;
        req.session["searchhistory"] = searchhistory;
    }
    if(Number(req.query.pageIndex)){
        options.currentPage = req.query.pageIndex;
    }
    if(Number(req.query.sortType)){
        options.sortType = req.query.sortType;
    }
    if(req.query.viewType !== undefined){
        options.sortViewType = req.query.viewType;
    }
    if(req.query.isHaveGoods !== undefined){
        options.isHaveGoods = req.query.isHaveGoods;
    }
    if(req.query.brandName){
        options.brandName = req.query.brandName;
    }
    if(req.query.categoryName){
        options.categoryName = req.query.categoryName;
    }
    if(req.query.areaName){
        options.sourceAreas = req.query.areaName;
    }
    util.fetchAPI("fetchGoodsList", options).then(function(resp) {
        if (resp.returnCode === 0) {
            var goods = resp.object;
            var list = filterGoodsList(goods.cbls);
            if(req.xhr===true){
                res.json({
                    list:list,
                    isFetched:true
                });
            }else{
                var initialState = {
                    list:list,
                    filters:{
                        categoryNames:filterNames(goods.categoryNames),
                        brandNames:filterNames(goods.brandNames),
                        areaNames:filterNames(goods.areaNames)
                    },
                    params:{
                        pageIndex:options.currentPage,
                        categoryName:options.categoryName,
                        brandName:options.brandName,
                        areaName:options.sourceAreas,
                        k:options.searchKey,
                        sortType:options.sortType,
                        viewType:options.sortViewType,
                        isHaveGoods:options.isHaveGoods
                    },
                    keyword:options.searchKey,
                    totalPage:Math.ceil(goods.totalsNum/options.pageSize),
                    isFetched:true
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
            next(new Error(resp.message));
        }
    });
}

module.exports = search;