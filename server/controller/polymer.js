'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var md5 = require("md5");
var Polymer = util.getSharedComponent("polymer");
var config = require("../lib/config");

var polymer = function(req, res, next) {
    util.fetchAPI("allCategory",{}).then(function(resp) {
        if(resp.returnCode===0){
            var categories = categoryFilter(resp.object)
            var initialState = {
                categories: categories
            }; 
            var markup = util.getMarkupByComponent(Polymer({
                initialState:initialState
            }));
            res.render('polymer', {
                markup: markup,
                initialState: initialState
            },function(err,html){
                util.writePage(md5(req.originalUrl),html)
                res.send(html)
            });
        }else{
            next(new Error("polymer error"))
        } 
    });
}

function categoryFilter(categories){
    var _categories = [];
    _.each(categories,function(category){
        var _category = {
            name:category.name,
            code:category.id,
            children:[]
        }
        _.each(category.children,function(child){
            _category["children"].push({
                name:child.name,
                imageUrl: child.imageUrl ? config.imgServer + child.imageUrl : "/client/asset/images/hwg_space.png",
                id:child.id
            })
        })
        _categories.push(_category)
    })
    return _categories;
}

var categoryActivity = function(req,res,next){
    var code = req.query.code
    util.fetchAPI("categoryActivity",{
        categorysCode:code
    }).then(function(ret){
        if(ret.returnCode === 0){
            var categoryactivity = categoryActivityFilter(ret.object?ret.object[0]:{})
            res.json({
                result:categoryactivity,
                isFetched:true
            })
        }else{
            res.json({
                isFetched:false,
                errMsg:ret.message
            })
        }
    },function(){
        res.json({
            isFetched:false,
            errMsg:"api request failed"
        })
    })
}

function categoryActivityFilter(activity){
    var _activity = {}
    _activity["imageUrl"] = config.imgServer + activity.imageUrl
    _activity["jumpUrl"] = getJumpUrl(activity)
    return _activity
}

function getJumpUrl(activity) {
    var jumpUrl = null;
    switch (activity.hasTemplate) {
        case "2":
            jumpUrl = activity.activityUrl
            break;
        case "3":
            if(activity.activityProductList){
                var singleCode = activity.activityProductList[0]["singleCode"]
                jumpUrl = "/gooddetail/" + singleCode
            }
            break;
        default:
            jumpUrl = "/activity/" + activity.id;
    }
    return jumpUrl
}

var categoryBrands = function(req,res,next){
    util.fetchAPI("categoryBrands",{}).then(function(ret){
        if(ret.returnCode === 0){
            var categorybrands = ret.object
            categorybrands = categoryBrandsFilter(categorybrands)
            res.json({result:categorybrands,categoryBrandsFetched:true})
        }else{
            res.json({
                categoryBrandsFetched:false,
                errMsg:ret.message
            })
        }
    },function(){
        res.json({
            categoryBrandsFetched:false,
            errMsg:"api request failed"
        })
    })
}

function categoryBrandsFilter(categorybrands){
    var _categoryBrands = {};
    _categoryBrands["recommendBrands"] = _.result(_.findWhere(categorybrands,{"CategoryName":"推荐品牌"}),"introduceList")
    _categoryBrands["recommendBrands"] = _.map(_categoryBrands["recommendBrands"],function(v){
        return {
            id:v.id,
            chineseName:v.chineseName,
            englishName:v.englishName,
            imageUrl:config.imgServer + v.imageUrl
        }
    })
    _categoryBrands["categories"] = _.reject(categorybrands,{"CategoryName":"推荐品牌"})
    _categoryBrands["categories"] = _.map(_categoryBrands["categories"],function(category){
        var brands = _.map(category["introduceList"],function(v){
            return {
                id:v.id,
                chineseName:v.chineseName,
                englishName:v.englishName,
                imageUrl:config.imgServer + v.imageUrl
            }
        })
        return {
            name:category.CategoryName,
            brands:brands
        }
    })
    return _categoryBrands
}

var allBrands = function(req,res,next){
    util.fetchAPI("allBrands",{}).then(function(ret){
        if(ret.returnCode === 0){
            var allbrands = ret.object
            allbrands = allBrandsFilter(allbrands);
            res.json({result:allbrands,brandsFetched:true})
        }else{
            res.json({
                brandsFetched:false,
                errMsg:ret.msg
            })
        }
    })
}

function allBrandsFilter(allbrands){
    var _allbrands = {}
    _.each(allbrands,function(v,k){
        var brandGroup = []
        _.each(v,function(brand){
            brandGroup.push({
                id:brand.id,
                chineseName:brand.name,
                englishName:brand.engName,
                shortcut:brand.firstLetter
            })
        })
        _allbrands[k] = brandGroup
    })
    return _allbrands
}

var allOrigins = function(req,res,next){
    util.fetchAPI("allOrigins",{}).then(function(ret){
        if(ret.returnCode === 0){
            var allorigins = ret.object
            allorigins = allOriginsFilter(allorigins)
            res.json({result:allorigins,originFetched:true})
        }else{
            res.json({
                originFetched:false,
                errMsg:ret.msg
            })
        }
    })
}

function allOriginsFilter(allorigins){
    var _allorigins = []
    _allorigins = _.map(allorigins,function(origin){
        return {
            backgroundImageUrl:config.imgServer + origin.backGroupImageUrl,
            imageUrl:config.imgServer + origin.imageUrl,
            id:origin.id,
            name:origin.name
        }
    })
    return _allorigins
}


module.exports = {
    polymer:polymer,
    categoryActivity:categoryActivity,
    categoryBrands:categoryBrands,
    allBrands:allBrands,
    allOrigins:allOrigins
};