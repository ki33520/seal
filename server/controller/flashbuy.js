'use strict';
var util = require("../lib/util");
var FlashBuy = util.getSharedComponent("flashbuy");
var config = require("../lib/config");
var _ = require("lodash");
var bluebird = require("bluebird");
var sharedUtil = require("../../shared/lib/util.es6");
var snsUrl = "http://sns.e9448.com/sns/system/v1/timestamp";


var flashBuy = function(req,res,next) {
    var id = req.params.id;
    bluebird.props({
        goods:util.fetchAPI("flashBuy",{
            manageId:id,
            start:0,
            limit:10
        }),
        snsTime:sharedUtil.apiRequest(snsUrl)
    }).then(function(ret){
        var goods = ret.goods;
        var snsTime = ret.snsTime;
        if(goods.returnCode === 0 && snsTime.returnCode===0){
            var initialState = {
                groupGoods:flashBuyFilter(goods.object,snsTime.systemTime)
            };
            var markup = util.getMarkupByComponent(FlashBuy({
                initialState:initialState
            }));
            res.render("flashbuy", {
                markup: markup,
                initialState:initialState
            });

        }else{
            next(new Error(ret.msg))
        }
    });
     
};

function flashBuyFilter(flashbuys,systemTime){
    var flashGoods = [];
    var preFlashGoods =  [];
    _.map(flashbuys,function(flashbuy){
        var beginTime = new Date(flashbuy.startTime).getTime();
        var overTime = new Date(flashbuy.endTime).getTime();

        if(overTime > systemTime) {
            var list = {
                startTime:beginTime,
                endTime:overTime,
                goodsList:goodsFilter(flashbuy.activityProductList)
            }
            if(beginTime < systemTime){
                flashGoods.push(list)
            }else{
                preFlashGoods.push(list)
            }
        }

    });

    flashGoods = flashGoods.sort(function(a,b){
        return a.startTime - b.startTime
    });

    preFlashGoods = preFlashGoods.sort(function(a,b){
        return a.startTime - b.startTime
    });

    return {flashGoods,preFlashGoods}
}

function goodsFilter(goodsList){
    return _.map(goodsList,function(goods,i){
        return {
            id:goods.singleCode,
            imageUrl:config.imgServer + goods.imageUrl,
            originPrice:goods.originPrice,
            salePrice:goods.salesPrice,
            title:goods.title,
            sourceName:goods.sourceName,
            flag:config.imgServer + goods.sourceImageUrl
        }
    });
}

module.exports = flashBuy;