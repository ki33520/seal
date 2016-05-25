'use strict';
var _ = require("lodash");
var util = require("../lib/util.js");
var GoodListApp = util.getSharedComponent("goodlist");
var config = require("../lib/config");
var ErrorContent = util.getSharedComponent("goodlist", "error.jsx");

function filterGoodsList(result){
    var list = [];
    var imgServer = config.imgServer;
    result && _.forEach(result,function(v){
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
    var keyword = req.query.k;
    if(keyword){
        options.searchKey=keyword;
        var searchhistory = util.saveSearchHistory(req.cookies["searchhistory"],{
            keyword:keyword,
            createAt:Date.now()
        });
        res.cookie("searchhistory",searchhistory);
    }
    if(req.query.pageIndex>1){
        options.currentPage = parseInt(req.query.pageIndex,10);
    }
    if(req.query.sortType){
        options.sortType = parseInt(req.query.sortType,10);
    }
    if(req.query.viewType !== undefined){
        options.sortViewType = req.query.viewType;
    }
    if(req.query.isHaveGoods !== undefined){
        options.isHaveGoods = !!req.query.isHaveGoods;
    }
    if(req.query.brandName){
        var brandName = req.query.brandName;
        if(_.isArray(brandName)){
            brandName = _.uniq(brandName).join(',');
        }
        options.brandName = brandName;
        if(!keyword) {keyword= options.brandName;}
    }
    if(req.query.categoryName){
        var categoryName = req.query.categoryName;
        if(_.isArray(categoryName)){
            categoryName = _.uniq(categoryName).join(',');
        }
        options.categoryName = categoryName;
        if(!keyword) {keyword= options.categoryName;}
    }
    if(req.query.areaName){
        var areaName = req.query.areaName;
        if(_.isArray(areaName)){
            areaName = _.uniq(areaName).join(',');
        }
        options.sourceAreas = areaName;
        if(!keyword) {keyword= options.sourceAreas;}
    }
  
    util.fetchAPI("fetchGoodsList", options,false,{method:"POST"}).then(function(resp) {
        if (resp.returnCode === 0) {
            var goods = resp.object,
                goodsList = filterGoodsList(goods.cbls),
                totalPage=Math.ceil(goods.totalsNum/options.pageSize);

            if(req.xhr===true){
                res.json({
                    goodsList:goodsList,
                    totalPage:totalPage,
                    pageIndex:options.currentPage,
                    isFetched:true
                });
            }else{
                var initialState = {
                    goodsList:goodsList,
                    categoryNames:filterNames(goods.categoryNames),
                    brandNames:filterNames(goods.brandNames),
                    areaNames:filterNames(goods.areaNames),
                    viewType:options.viewType,
                    sortType:options.sortType,
                    isHaveGoods:options.isHaveGoods,
                    keyword:keyword,
                    totalPage:totalPage,
                    pageIndex:options.currentPage,
                    pageSize:options.pageSize,
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
                    goodsList:[],
                    isFetched:false
                });
            }else{
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