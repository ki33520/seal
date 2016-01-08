'use strict';
var util = require("../lib/util");
var FlashBuy = util.getSharedComponent("flashbuy");
var config = require("../lib/config");
var _ = require("lodash");

var flashBuy = function(req,res,next) {
    var id = req.params.id
    util.fetchAPI("flashBuy",{
        manageId:id,
        start:0,
        limit:10
    }).then(function(ret){
        if(ret.returnCode === 0){
            var initialState = {
                groupGoods:ret.object
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
    },function(){
        next(new Error("api request failed"))
    })
};

function flashBuyFilter(flashbuys){
    var _flashbuys = _.map(flashbuys,function(flashbuy){
        return {
            imageUrl:config.imgServer + flashbuy.imageUrl,
            startTime:flashbuy.startTime,
            endTime:flashbuy.endTime,
        }
    })
    _flashbuys = _.groupBy(_flashbuys,function(flashbuy){
        return flashbuy.startTime == null
    })
    return _flashbuys
}

module.exports = flashBuy