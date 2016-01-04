'use strict';
var util = require("../lib/util");
var FlashBuy = util.getSharedComponent("flashbuy");
var config = require("../lib/config");

var flashBuy = function(req,res,next) {
    util.fetchAPI("index",{},true).then(function(ret){
        if(ret.code === "success"){
            var initialState = {
                data:ret.object
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

module.exports = flashBuy