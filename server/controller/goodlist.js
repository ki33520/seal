'use strict';
var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var config = require("../lib/config.js");
var GoodListApp = util.getSharedComponent("goodlist");
var DEFT = require("../../shared/chunk/goodlist/constant.es6");
 
function filterGoodsList(result){
    var list = [];
 
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
    var list = [];
    result && result.map((item,i)=>{
        list.push({
            id:item.id,
            name:item.name,
            isChecked:false
        })
    });

    return list;
}

var search = function(req, res, next) {
    var query = req.query;
    var pageSize = query.pageSize || 10;
    var options = {
        currentPage:1,
        sortType:DEFT.SORT_NORMAL,
        sortViewType:DEFT.SORT_DESC,
        pageSize:pageSize
    };

    if(query.k){
        options.searchKey=query.k;
    }

    if(query.pageIndex){
        options.currentPage = query.pageIndex;
    }

    if(query.sortType !== undefined){
        options.sortType = query.sortType;
    }
 
    if(query.sortViewType!== undefined){
        options.sortViewType = query.sortViewType;
    }

    if(query.isHaveGoods!== undefined){
        options.isHaveGoods = query.isHaveGoods;
    }

    if(query.brandNames){
        options.brandName = query.brandNames;
    }

    if(query.categoryNames){
        options.categoryName = query.categoryNames;
    }

    if(query.areaNames){
        options.sourceAreas = query.areaNames;
    }

    var params = Object.assign({},options);

    if(params.searchKey){
        params.searchKey=null;
        params.k = options.searchKey;
    }

    params.currentPage = null;
    params.pageIndex = options.currentPage;
 
    bluebird.props({
        goods: util.fetchAPI("fetchGoodsList", options)
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            var goods = resp.goods.object;
            var list = filterGoodsList(goods.cbls);
            
            if(req.xhr===true){
                res.json({
                    goods:list,
                    isFetching:false
                });
            }else{
                var categoryNames = filterNames(goods.categoryNames);
                var brandNames = filterNames(goods.brandNames);
                var areaNames = filterNames(goods.areaNames);
                var totalPage = Math.ceil(goods.totalsNum/pageSize);

                var initialState = {
                    goods:list,
                    filters:{categoryNames,brandNames,areaNames},
                    searchParams:params,
                    totalPage:totalPage
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
            var ErrorContent = util.getSharedComponent("common","error.jsx");
            var initialState = {
                code: "500",
                msg: resp.goods.message
            };
            var markup = util.getMarkupByComponent(ErrorContent({
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

module.exports = search;