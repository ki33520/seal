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
        //test ## ##
        var tmp = item.split('##');
        item = {name:tmp[0],id:tmp[1]};

        list.push({
            id:item.id,
            name:item.name
        })
    });
    return list;
}
 
function filterResult(result){
 
    return {
        areaNames:filterNames(result.areaNames),
        brandNames:filterNames(result.brandNames),
        categoryNames:filterNames(result.categoryNames),
        goodsList:filterGoodsList(result.cbls)
    }
}

var goodList = function(req, res, next) {
    let searchKey = req.query.searchKey||'';
    let currentPage = req.query.pageIndex||1;
    let sortType = req.query.sortType||1;
    let sortViewType = req.query.sortViewType||true;
    let isHaveGoods = req.query.isHaveGoods||false;

    bluebird.props({
        goods: util.fetchAPI("fetchGoodsList", {
            searchKey,
            sortType,
            sortViewType,
            currentPage
        })
    }).then(function(resp) {
        if (resp.goods.returnCode === 0) {
            let result = filterResult(resp.goods);
            if (req.xhr === true) {
                res.json(result);
            } else {
                 
                let initialState = {
                    keyword:searchKey,
                    goodsList:result.goodsList,
                    areaNames:result.areaNames,
                    brandNames:result.brandNames,
                    categorys:result.categoryNames
                };

                let markup = util.getMarkupByComponent(GoodListApp({
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
        next(new Error("api request failed"))
    });

}



module.exports = goodList;