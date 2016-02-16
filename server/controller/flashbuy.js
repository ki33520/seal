'use strict';
var _ = require("lodash");
var moment = require("moment");
var bluebird = require("bluebird");
var util = require("../lib/util");
var FlashBuy = util.getSharedComponent("flashbuy");
var sharedUtil = require("../../shared/lib/util.es6");
var filter = require("../lib/filter.js");

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
                preSaleTime:moment(startTime).format('DD日HH时'),
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

function goodsFilter(goodsList){
    return _.map(goodsList,function(goods,i){
        var salesPrice = filter.price({
            flashPrice:goods.wapPrice,
            mobilePrice:goods.mobilePrice,
            salesPrice:goods.salesPrice,
            startTime:goods.beginDateStr,
            endTime:goods.endDateStr
        });
        return {
            singleCode:goods.singleCode,
            title:goods.title,
            imageUrl:filter.imageUrl(goods.imageUrl),
            originPrice:goods.originPrice,
            salesPrice:salesPrice,
            sourceName:goods.sourceName,
            sourceImageUrl:filter.imageUrl(goods.sourceImageUrl),
            isSaleOut:filter.isSoldOut(goods.localStock),
            saleType:filter.saleType(goods)
        }
    });
}

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

module.exports = flashBuy;