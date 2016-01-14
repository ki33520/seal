'use strict';
var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var config = require("../lib/config.js");
var GoodListApp = util.getSharedComponent("goodlist");
var pageSize=10;
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
            name:item.name
        })
    });

    return list;
}

var goodList = function(req, res, next) {
    let keyword = req.params.keyword;
    
    bluebird.props({
        goods: util.fetchAPI("fetchGoodsList", {
            searchKey:keyword,
            sortType:1,
            currentPage:1,
            pageSize:pageSize,
            sortViewType:false,
            isHaveGoods:true
        })
    }).then(function(resp) {
 
        if (resp.goods.returnCode === 0) {
            let goods = resp.goods;

            let sideBar = {
                areaNames:filterNames(goods.areaNames),
                brandNames:filterNames(goods.brandNames),
                categorys:filterNames(goods.categoryNames)
            };

            let totalPage = Math.ceil(goods.totalsNum/pageSize);

            let initialState = {
                keyword:keyword,
                goods:filterGoodsList(goods.cbls),
                sideBar:sideBar,
                total:totalPage,
                page:1
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
    let param = {
        searchKey:req.body.keyword,
        page:req.body.page
    };
 
    
    if(req.body.sortType !== undefined){
        param.sortType = req.body.sortType;
    }
 
    if(req.body.sortViewType!== undefined){
        param.sortViewType = req.body.sortViewType;
    }

    if(req.body.isHaveGoods!== undefined){
        param.isHaveGoods = req.body.isHaveGoods;
    }

    if(req.body.brandName!== undefined){
        param.brandName = req.body.brandName;
    }

    if(req.body.categoryName!== undefined){
        param.categoryName = req.body.categoryName;
    }

    if(req.body.sourceAreas!== undefined){
        param.sourceAreas = req.body.sourceAreas;
    }

    bluebird.props({
        goods: util.fetchAPI("fetchGoodsList", param)
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            if (req.xhr === true) {
                res.json({
                    goods:filterGoodsList(resp.goods.cbls),
                    page:Number(req.body.page),
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