'use strict';
var util = require("../lib/util");
var Topic = util.getSharedComponent("topic");
var config = require("../lib/config");

var mobileOnly = function(req,res,next) {
    util.fetchAPI("index",{},true).then(function(ret){
        if(ret.code === "success"){
            var initialState = {
                data:ret.object,
                title:"手机专享"
            };
            var markup = util.getMarkupByComponent(Topic({
                initialState:initialState
            }));
            res.render("topic", {
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
var finest = function(req,res,next) {
    util.fetchAPI("index",{},true).then(function(ret){
        if(ret.code === "success"){
            var initialState = {
                data:ret.object,
                title:"海外精选"
            };
            var markup = util.getMarkupByComponent(Topic({
                initialState:initialState
            }));
            res.render("topic", {
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
var stockup = function(req,res,next) {
    util.fetchAPI("index",{},true).then(function(ret){
        if(ret.code === "success"){
            var initialState = {
                data:ret.object,
                title:"今日海囤"
            };
            var markup = util.getMarkupByComponent(Topic({
                initialState:initialState
            }));
            res.render("topic", {
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

module.exports = {
    mobileOnly:mobileOnly,
    stockup:stockup,
    finest:finest,
}


