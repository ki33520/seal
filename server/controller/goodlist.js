'use strict';
var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var config = require("../lib/config.js");
var GoodListApp = util.getSharedComponent("goodlist");

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
    let pageIndex = 1;
    let pageSize = 10;
    let sortType=1;
    let sortViewType=false;
    let isHaveGoods=false;
    bluebird.props({
        goods: util.fetchAPI("fetchGoodsList", {
            searchKey:keyword,
            currentPage:pageIndex,
            sortType,
            sortViewType,
            isHaveGoods,
            pageSize
        })
    }).then(function(resp) {
 
        if (resp.goods.returnCode === 0) {
            let goods = resp.goods.object;
            let categoryNames = filterNames(goods.categoryNames);
            let brandNames = filterNames(goods.brandNames);
            let areaNames = filterNames(goods.areaNames);
            let totalPage = Math.ceil(goods.totalsNum/pageSize);

            let initialState = {
                goods:filterGoodsList(goods.cbls),
                filters:{categoryNames,brandNames,areaNames},
                search:{keyword,pageIndex,pageSize,sortType,sortViewType,isHaveGoods},
                totalPage
            };

            let markup = util.getMarkupByComponent(GoodListApp({
                initialState: initialState
            }));

            res.render('goodlist', {
                markup: markup,
                initialState: initialState
            })
             
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
        }
    },function(){
        next(new Error("api request failed"))
    });

}

var sortList = function(req, res, next){
    let params = req.body;
    let pageIndex = req.body.pageIndex || 1;
    let pageSize = req.body.pageSize || 10;
    let keyword = req.body.keyword;
    let options = {
        searchKey:keyword,
        currentPage:pageIndex,
        pageSize
    };
    
    if(params.sortType !== undefined){
        options.sortType = params.sortType;
    }
 
    if(params.sortViewType!== undefined){
        options.sortViewType = params.sortViewType;
    }

    if(params.isHaveGoods!== undefined){
        options.isHaveGoods = params.isHaveGoods;
    }

    if(params.brandNames){
        options.brandName = params.brandNames;
    }

    if(params.categoryNames){
        options.categoryName = params.categoryNames;
    }

    if(params.areaNames){
        options.sourceAreas = params.areaNames;
    }

    let queryParams = Object.assign({},{
            sortType:1,
            sortViewType:false,
            isHaveGoods:false
        },options);
    bluebird.props({
        goods: util.fetchAPI("fetchGoodsList", options)
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            if (req.xhr === true) {
                res.json({
                    goods:filterGoodsList(resp.goods.object.cbls),
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