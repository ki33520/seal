'use strict';
var _ = require("lodash");
var util = require("../lib/util.js");
var GoodListApp = util.getSharedComponent("goodlist");
var config = require("../lib/config");
var ErrorContent = util.getSharedComponent("goodlist", "error.jsx");

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
            smallImageUrl:imgServer+v.picUrl+'@500w_500h_4e',
            sourceImageUrl:imgServer+v.areaLogo,
            localStock:v.localStock,
            useMobilePrice:!!v.useMobilePrice
        });
    });
    return list;
}

function filterNames(result,tartget){
    var list = [];
    result && _.each(result,function(item){
        list.push({
            id:item.id,
            name:item.name,
            isChecked:tartget===item.name?true:false
        });
    });
    return list;
}

var search = function(req, res, next) {
    var options = {
        currentPage:1,
        pageSize:10
    };
    var keyword = req.query.k;
    var brandName=req.query.brandName;
    var areaName = req.query.areaName;
    var categoryName = req.query.categoryName;
    if(keyword !== undefined){
        var searchhistory = util.saveSearchHistory(req.cookies["searchhistory"],{
            keyword:keyword,
            createAt:Date.now()
        });
        options.searchKey=keyword;
        res.cookie("searchhistory",searchhistory)
        // req.session["searchhistory"] = searchhistory;
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
    if(brandName){
        options.brandName = brandName;
    }
    if(categoryName){
        options.categoryName = categoryName;
    }
    if(areaName){
        options.sourceAreas = areaName;
    }
    keyword = keyword||areaName||brandName||categoryName;
    util.fetchAPI("fetchGoodsList", options,false,{method:"POST"}).then(function(resp) {
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
                        categoryNames:filterNames(goods.categoryNames,categoryName),
                        brandNames:filterNames(goods.brandNames,brandName),
                        areaNames:filterNames(goods.areaNames,areaName)
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
                    keyword:keyword,
                    totalPage:Math.ceil(goods.totalsNum/options.pageSize),
                    isFetched:true
                };
                var markup = util.getMarkupByComponent(GoodListApp({
                    initialState: initialState
                }));
                res.render('goodlist', {
                    markup: markup,
                    initialState: initialState
                },function(err,html){
                    util.writeToStaticCache(req,html)
                    res.send(html)
                });
            }
        } else {
            if(req.xhr===true){
                res.json({
                    list:[],
                    isFetched:false
                });
            }else{
                //next(new Error(resp.message));
                var initialState = {
                    code: "500",
                    keyword:keyword
                };
                var markup = util.getMarkupByComponent(ErrorContent({
                    initialState: initialState
                }));

                res.render('goodlist', {
                    markup: markup,
                    initialState: initialState
                });
            }
        }
    },function(){
        // next(new Error('api request failed'));
        var initialState = {
            code: "500",
            keyword:keyword
        };
        var markup = util.getMarkupByComponent(ErrorContent({
            initialState: initialState
        }));

        res.render('goodlist', {
            markup: markup,
            initialState: initialState
        });
    });
}

module.exports = search;