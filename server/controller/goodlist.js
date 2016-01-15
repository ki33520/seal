'use strict';
var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var config = require("../lib/config.js");
var GoodListApp = util.getSharedComponent("goodlist");
var pageSize=10;
var PARAMS = {
        sortType:1,
        pageSize:pageSize,
        sortViewType:false,
        isHaveGoods:false
    };

function filterGoodsList(result){
    let list = [];
 
    result && result.map((v)=>{
        list.push({
            smallImageUrl:config.imgServer + v.imageUrlWap,
            salesPrice:v.salesPrice,
            originPrice:v.originPrice,
            discounts:v.discounts,
            stock:v.stock,
            id:v.singleCode,
            materTitle:v.materTitle,
            productArea:v.productArea,
            flag:config.imgServer +v.flag,
            activityType:v.activityType
        })
    });
    
    return list;
}

function filterNames(result){
    let list = [];
    result && result.map((item,i)=>{
        list.push({
            id:item.id,
            name:item.name,
            isChecked:false
        })
    });

    return list;
}

var goodList = function(req, res, next) {
    let keyword = req.params.keyword;
    let newParam = Object.assign({
        keyword:keyword,
        pageIndex:1
    },PARAMS);
    
    let queryParam = Object.assign({
        searchKey:keyword,currentPage:1
    },PARAMS);

    bluebird.props({
        goods: util.fetchAPI("fetchGoodsList", queryParam)
    }).then(function(resp) {
 
        if (resp.goods.returnCode === 0) {
            let goods = resp.goods;

            let sideBar = {
                areaNames:filterNames(goods.areaNames),
                brandNames:filterNames(goods.brandNames),
                categoryNames:filterNames(goods.categoryNames)
            };

            let totalPage = Math.ceil(goods.totalsNum/pageSize);

            let initialState = {
                goods:filterGoodsList(goods.cbls),
                sideBar:sideBar,
                total:totalPage,
                params:newParam,
                pageIndex:1
            };

            let markup = util.getMarkupByComponent(GoodListApp({
                initialState: initialState
            }));

            res.render('goodlist', {
                markup: markup,
                initialState: initialState
            })
             
        } else {
            next(new Error(resp.msg));
        }
    },function(){
        next(new Error("api request failed"))
    });

}

var sortList = function(req, res, next){
    let options = {
        searchKey:req.body.keyword,
        currentPage:req.body.pageIndex
    };
    
    if(req.body.sortType !== undefined){
        options.sortType = req.body.sortType;
    }
 
    if(req.body.sortViewType!== undefined){
        options.sortViewType = req.body.sortViewType;
    }

    if(req.body.isHaveGoods!== undefined){
        options.isHaveGoods = req.body.isHaveGoods;
    }

    if(req.body.brandNames){
        options.brandName = req.body.brandNames;
    }

    if(req.body.categoryNames){
        options.categoryName = req.body.categoryNames;
    }

    if(req.body.areaNames){
        options.sourceAreas = req.body.areaNames;
    }

    let queryParam = Object.assign(options,PARAMS);
    bluebird.props({
        goods: util.fetchAPI("fetchGoodsList", queryParam)
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            if (req.xhr === true) {
                res.json({
                    goods:filterGoodsList(resp.goods.cbls),
                    isFetching:false
                });
            }else{
                next(new Error(resp.msg));
            }
        }
    });
}

module.exports = {
    goodList:goodList,
    sortList:sortList
};