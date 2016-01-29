'use strict';
var util = require("../lib/util");
var FlashBuy = util.getSharedComponent("flashbuy");
var config = require("../lib/config");
var _ = require("lodash");
var bluebird = require("bluebird");
var sharedUtil = require("../../shared/lib/util.es6");
var moment = require("moment");
var flashBuy = function(req,res,next) {
    var id = req.params.id;
    bluebird.props({
        goods:util.fetchAPI("flashBuy",{
            manageId:id,
            start:0,
            limit:10
        }),
        timestamp: util.fetchAPI("timestamp",{},false)
    }).then(function(resp){
        if(resp.goods.returnCode === 0 && resp.timestamp.returnCode===0){
            var initialState = {
                groupGoods:flashBuyFilter(resp.goods.object,resp.timestamp.systemTime)
            };
            var markup = util.getMarkupByComponent(FlashBuy({
                initialState:initialState
            }));
            res.render("flashbuy", {
                markup: markup,
                initialState:initialState
            });
        }else{
            if(resp.goods.returnCode !== 0){
                next(new Error(resp.goods.message));
            }
            if(resp.timestamp.returnCode !== 0){
                next(new Error(resp.timestamp.message));
            }
        }
    });
     
};

function flashBuyFilter(flashbuys,systemTime){
    var flashGoods = [];
    var preFlashGoods =  [];
    _.map(flashbuys,function(flashbuy){
        var startTime = new Date(flashbuy.startTime);
        var endTime = new Date(flashbuy.endTime);

        if(endTime > systemTime) {
            var list = {
                startTime:moment(startTime).format("YYYY-MM-DD HH:mm:ss"),
                endTime:moment(endTime).format("YYYY-MM-DD HH:mm:ss"),
                preSaleTime:moment(startTime).format('HH:mm'),
                goodsList:goodsFilter(flashbuy.activityProductList)
            }
            if(startTime < systemTime){
                flashGoods.push(list)
            }else{
                preFlashGoods.push(list)
            }
        }

    });

    flashGoods = flashGoods.sort(function(a,b){
        return moment(a.startTime).isBefore(b.startTime)
    });

    preFlashGoods = preFlashGoods.sort(function(a,b){
        return moment(a.startTime).isBefore(b.startTime)
    });

    return {flashGoods,preFlashGoods}
}

function getSalesPrice(goods){
    if(goods.wapPrice > 0){
        return goods.wapPrice;
    }else if(goods.mobilePrice > 0){
        return goods.mobilePrice;
    }else{
        return goods.salesPrice;
    }
}

function goodsFilter(goodsList){
    return _.map(goodsList,function(goods,i){
        return {
            id:goods.singleCode,
            imageUrl:config.imgServer + goods.imageUrl,
            originPrice:goods.originPrice,
            salesPrice:getSalesPrice(goods),
            title:goods.title,
            sourceName:goods.sourceName,
            sourceImageUrl:config.imgServer + goods.sourceImageUrl,
            isSaleOut:goods.localStock > 0 ? false : true,
            isFlashPrice:goods.wapPrice > 0 ? true : false,
            isMobilePrice:goods.mobilePrice>0? true:false
        }
    });
}

module.exports = flashBuy;