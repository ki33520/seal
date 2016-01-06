'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var Polymer = util.getSharedComponent("polymer");

var polymer = function(req, res, next) {
    bluebird.props({
        category: util.fetchAPI("allCategory",{})
    }).then(function(resp) {
        if(resp.category.returnCode===0){
            let categories = resp.category.object
            var initialState = {
                categories: categories
            }; 
            var markup = util.getMarkupByComponent(Polymer({
                initialState:initialState
            }));
            res.render('polymer', {
                markup: markup,
                initialState: initialState
            });
        }else{
            next(new Error(resp.category.msg))
        } 
    });
}

var categoryBrands = function(req,res,next){
    util.fetchAPI("categoryBrands",{}).then(function(ret){
        if(ret.returnCode === 0){
            var categorybrands = ret.object
            // categorybrands = _.map(categorybrands,function(hotword){
            //     return {
            //         id:hotword.id,
            //         name:hotword.wordName
            //     }
            // })
            res.json({result:categorybrands,categoryBrandsFetched:true})
        }else{
            res.json({
                categoryBrandsFetched:false,
                errMsg:ret.msg
            })
        }
    })
}
var allBrands = function(req,res,next){
    util.fetchAPI("allBrands",{}).then(function(ret){
        if(ret.returnCode === 0){
            var allbrands = ret.object
            // categorybrands = _.map(categorybrands,function(hotword){
            //     return {
            //         id:hotword.id,
            //         name:hotword.wordName
            //     }
            // })
            res.json({result:allbrands,brandsFetched:true})
        }else{
            res.json({
                brandsFetched:false,
                errMsg:ret.msg
            })
        }
    })
}
var allOrigins = function(req,res,next){
    util.fetchAPI("allOrigins",{}).then(function(ret){
        if(ret.returnCode === 0){
            var allorigins = ret.object
            // allorigins = _.map(allorigins,function(hotword){
            //     return {
            //         id:hotword.id,
            //         name:hotword.wordName
            //     }
            // })
            res.json({result:allorigins,originFetched:true})
        }else{
            res.json({
                originFetched:false,
                errMsg:ret.msg
            })
        }
    })
}


module.exports = {
    polymer:polymer,
    categoryBrands:categoryBrands,
    allBrands:allBrands,
    allOrigins:allOrigins
};