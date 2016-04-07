'use strict';
var _ = require("lodash");
var moment = require("moment");
var bluebird = require("bluebird");
var util = require("../lib/util");
var FlashBuy = util.getSharedComponent("flashbuy");
var sharedUtil = require("../../shared/lib/util.es6");
var config = require("../lib/config");

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
    var imgServer = config.imgServer;
    return _.map(goodsList,function(goods,i){
        return {
            singleCode:goods.singleCode,
            title:goods.title,
            flashPrice:goods.wapPrice,
            mobilePrice:goods.mobilePrice,
            salesPrice:goods.salesPrice,
            originPrice:goods.originPrice,
            startTime:goods.beginDateStr,
            endTime:goods.endDateStr,
            imageUrl:imgServer+goods.imageUrl,
            sourceName:goods.sourceName,
            sourceImageUrl:imgServer+goods.sourceImageUrl,
            localStock:goods.stock,
            onSale:goods.version===1,
            useMobilePrice:!!goods.useMobilePrice
        }
    });
}

var flashBuy = function(req,res,next) {
    var id = req.params.id;
    bluebird.props({
        goods:util.fetchAPI("flashBuy",{
            manageId:id,
            start:0,
            limit:100
        }),
        timestamp: util.fetchAPI("timestamp",{},false)
    }).then(function(resp){
        if(resp.goods.returnCode === 0 && resp.timestamp.returnCode===0){
            var groupGoods = flashBuyFilter(resp.goods.object,resp.timestamp.systemTime);
            var initialState = {
                groupGoods:groupGoods,
                isFetched:true
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
    }).error(function() {
        next(new Error('api request failed'));
    });
     
};

module.exports = flashBuy;