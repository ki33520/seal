'use strict'
var util = require("../lib/util");
var Index = util.getSharedComponent("index");
var config = require("../lib/config");
var _ = require("lodash");
var md5 = require("md5");
var moment = require("moment");

var index = function(req, res, next) {
    util.fetchAPI("indexChannels", {
        channel: "Mobile"
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            var channels = ret.object;
            channels = _.map(channels, function(channel) {
                return {
                    id: channel.id,
                    sort: channel.sort,
                    name: channel.manageName,
                    floors: {}
                }
            })
            channels = _.sortBy(channels, function(channel) {
                return channel.sort
            })
            // console.log('channels',channels)
            return channels
        } else {
            return next(new Error(ret.message))
        }
    }).then(function(channels) {
        if(channels && channels.length > 0){
            util.fetchAPI("floorsByChannel", {
                channel: "Mobile",
                manageId: channels[0].id,
                start: 0,
                limit: 3
            }).then(function(ret) {
                if (ret.returnCode === 0) {
                    channels[0].floors = floorFilter(ret.object)
                    var initialState = {
                        channels: channels
                    };
                    var markup = util.getMarkupByComponent(Index({
                        initialState: initialState
                    }));
                    res.render("index", {
                        markup: markup,
                        initialState: initialState
                    }, function(err, html) {
                        util.writePage(md5(req.originalUrl), html)
                        res.send(html)
                    });
                } else {
                    return next(new Error(ret.message))
                }
            })
        }
    })
};

var channel = function(req, res, next) {
    var id = req.query.id
    util.fetchAPI("floorsByChannel", {
        channel: "Mobile",
        manageId: id,
        start: 0,
        limit: 3
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            res.json({
                result: floorFilter(ret.object),
                channelFetched: true
            })
        } else {
            res.json({
                channelFetched: false,
                errMsg: ret.msg
            })
        }
    })
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

function floorFilter(floors) {
    var _floors = {};
    _floors["slides"] = _.result(_.findWhere(floors, {
        manageCode: "BANNER"
    }), "activityList")
    _floors["slides"] = _.map(_floors["slides"], function(slide) {
        return {
            id: slide.id,
            jumpUrl: getJumpUrl(slide),
            imageUrl: config.imgServer + slide.imageUrl
        }
    })
    _floors["badges"] = _.result(_.findWhere(floors, {
        manageCode: "ICON"
    }), "activityList")
    _floors["badges"] = _.map(_floors["badges"], function(badge) {
        return {
            id: badge.id,
            jumpUrl: getJumpUrl(badge),
            imageUrl: config.imgServer + badge.imageUrl,
            title: badge.activityTitle
        }
    })
    _floors["rushbuys"] = _.result(_.findWhere(floors, {
        manageCode: "ACTIVITY_ZC"
    }), "activityList")
    _floors["rushbuys"] = _.map(_floors["rushbuys"], function(rushbuy) {
        return {
            id: rushbuy.id,
            jumpUrl: getJumpUrl(rushbuy),
            imageUrl: config.imgServer + rushbuy.imageUrl,
            startTime:moment(new Date(rushbuy.startTime)).format("YYYY-MM-DD HH:mm:ss"),
            endTime:moment(new Date(rushbuy.endTime)).format("YYYY-MM-DD HH:mm:ss")
        }
    })
    _floors["activityOne"] = _.result(_.findWhere(floors, {
        manageCode: "ACTIVITY_THREE"
    }), "activityList")
    _floors["activityOne"] = _.map(_floors["activityOne"], function(v) {
        return {
            id: v.id,
            name: v.activityName,
            jumpUrl: "/topic/"+v.id,
            imageUrl: config.imgServer + v.imageUrl,
        }
    })
    _floors["activityTwo"] = _.result(_.findWhere(floors, {
        manageCode: "ACTIVITY_TWO"
    }), "activityList")
    _floors["activityTwo"] = _.map(_floors["activityTwo"], function(v) {
        return {
            id: v.id,
            name: v.activityName,
            jumpUrl: getJumpUrl(v),
            imageUrl: config.imgServer + v.imageUrl,
        }
    })
    _floors["activityThree"] = _.result(_.findWhere(floors, {
        manageCode: "ACTIVITY_FOUR"
    }), "activityList")
    _floors["activityThree"] = _.map(_floors["activityThree"], function(v) {
        return {
            id: v.id,
            name: v.activityName,
            jumpUrl: getJumpUrl(v),
            imageUrl: config.imgServer + v.imageUrl,
        }
    })
    _floors["flashbuys"] = _.result(_.findWhere(floors, {
        manageCode: "ACTIVITY_SG"
    }), "activityList")
    _floors["flashbuyId"] = _.result(_.findWhere(floors, {
        manageCode: "ACTIVITY_SG"
    }), "id")
    if (_floors["flashbuys"]) {
        _floors["flashbuys"] = _.map(_floors["flashbuys"],function(flashbuy){
            flashbuy["id"] = 
            flashbuy["goods"] = [];
            if(flashbuy["activityProductList"]){
            flashbuy["startTime"] = moment(new Date(flashbuy.startTime)).format("YYYY-MM-DD HH:mm:ss")
            flashbuy["endTime"] = moment(new Date(flashbuy.endTime)).format("YYYY-MM-DD HH:mm:ss")
                _.each(flashbuy["activityProductList"],function(good){
                    var startTime = moment(new Date(good.beginDate)).format("YYYY-MM-DD HH:mm:ss")
                    var endTime = moment(new Date(good.endDate)).format("YYYY-MM-DD HH:mm:ss")
                    var isFlashbuyActive = false
                    if (moment().isBetween(startTime,endTime)) {
                        isFlashbuyActive = true
                    }
                    flashbuy["goods"].push({
                        startTime:startTime,
                        endTime:endTime,
                        isFlashbuyActive:isFlashbuyActive,
                        singleCode: good.singleCode,
                        imageUrl: config.imgServer + good.imageUrl,
                        salesPrice: good.salesPrice,
                        mobilePrice:good.mobilePrice,
                        flashPrice:good.wapPrice,
                        originPrice: good.originPrice,
                        title: good.title
                    })
                })
            }
            return flashbuy
        })
    }
    _floors["singleRecommend"] = _.result(_.findWhere(floors, {
        manageCode: "ACTIVITY_DPTJ"
    }), "activityList")
    if (_floors["singleRecommend"]) {
        _floors["singleRecommend"] = {
            id: _floors["singleRecommend"][0].id,
            goods: _floors["singleRecommend"][0].activityProductList
        }
    }
    _floors["newRecommend"] = _.result(_.findWhere(floors, {
        manageCode: "ACTIVITY_XPTJ"
    }), "activityList")
    if (_floors["newRecommend"]) {
        _floors["newRecommend"] = {
            id: _floors["newRecommend"][0].id,
            goods: _floors["newRecommend"][0].activityProductList
        }
    }
    return _floors
}

var updateGoods = function(req,res,next){
    var ids = req.query.ids
    util.fetchAPI("updateGoods",{
        codes:ids
    }).then(function(ret){
        if(ret.returnCode === 0){
            var result = updatedGoodsFilter(ret.object)
            res.json({
                goodsUpdated:true,
                result
            })
        }else{
            res.json({
                goodsUpdated:false,
                errMsg:ret.msg
            })
        }
    })
}

function updatedGoodsFilter(result){
    var _result = {}
    _result = _.mapValues(result,function(good){
        if(good.flashSalesObject){
            var startTime = moment(new Date(good.flashSalesObject.beginDate)).format("YYYY-MM-DD HH:mm:ss")
            var endTime = moment(new Date(good.flashSalesObject.endDate)).format("YYYY-MM-DD HH:mm:ss")
            var isFlashbuyActive = false
            if (moment().isBetween(startTime,endTime)) {
                isFlashbuyActive = true
            }
            good["startTime"] = startTime
            good["endTime"] = endTime
            good["isFlashbuyActive"] = isFlashbuyActive
            good["flashPrice"] = good.flashSalesObject.wapPrice            
        }
        if(good.singleObject){
            good["originPrice"] = good.singleObject.originPrice
            good["salesPrice"] = good.singleObject.salesPrice
            // good["salesPrice"] = 555
            good["discount"] = good.singleObject.discount
            good["stock"] = good.singleObject.stock.stock
            good["useMobilePrice"] = good.singleObject.useMobilePrice
            good["mobilePrice"] = good.singleObject.mobilePrice
            good["isOff"] = (good.singleObject.version == 2)
        }
        return good
    })
    return _result
}

var searchHotWords = function(req, res, next) {
    util.fetchAPI("fetchHotKeywords", {}).then(function(ret) {
        if (ret.returnCode === 0) {
            var hotwords = ret.object
            hotwords = _.map(hotwords, function(hotword) {
                return {
                    id: hotword.id,
                    name: hotword.wordName
                }
            })
            res.json({
                result: hotwords,
                hotwordFetched: true
            })
        } else {
            res.json({
                hotwordFetched: false,
                errMsg: ret.msg
            })
        }
    })
}

var searchHistory = function(req,res,next){
    if(req.xhr === true){
        var history = req.session["searchhistory"] || []
        // console.log('history',history)
        res.json({
            isFetched:true,
            result:history
        })
    }
}

var purgeSearchHistory = function(req,res,next){
    if(req.xhr === true){
        req.session["searchhistory"] = []
        res.json({
            isFinished:true
        })
    }
}

var searchAssociate = function(req, res, next) {
    var keyword = req.body.keyword

    //var searchhistory = util.saveSearchHistory(req.session["searchhistory"],keyword)
    //req.session["searchhistory"] = searchhistory
    util.fetchAPI("fetchAssociateKeywords", {
        searchKey: keyword
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            var associateWords = ret.object
            associateWords = _.map(associateWords, function(associateWord) {
                return {
                    // id: associateWord.singleCode,
                    name: associateWord.name
                }
            })
            res.json({
                result: associateWords,
                hotwordFetched: true
            })
        } else {
            res.json({
                hotwordFetched: false,
                errMsg: ret.msg
            })
        }
    })
}

var activityGood = function(req, res, next) {
    var activityId = req.query.activityId;
    var activityType = req.query.activityType;
    util.fetchAPI("activityGood", {
        channel: "Mobile",
        activityId: activityId,
        activityType: activityType,
        start: 0,
        limit: 10
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            var goods = activityGoodFilter(ret.object.result)
            var ids = []
            _.each(goods,function(good){
                ids.push(good.singleCode)
            })
            util.fetchAPI("updateGoods",{
                codes:ids.join(",")
            }).then(function(subRet){
                if(subRet.returnCode === 0){
                    var result = updatedGoodsFilter(subRet.object)
                    var _goods = _.map(goods,function(good){
                        let updatedGood = result[good.singleCode]
                        good = Object.assign({},good,updatedGood)
                        return good
                    })
                    res.json({
                        result: _goods,
                        goodFetched: true
                    })
                }else{
                    res.json({
                        goodFetched:false,
                        errMsg:res.msg
                    })
                }
            })
        } else {
            res.json({
                goodFetched: false,
                errMsg: ret.msg
            })
        }
    })
}

function activityGoodFilter(goods) {
    var _goods = [];
    _goods = _.map(goods, function(good) {
        return {
            singleCode: good.singleCode,
            title: good.title,
            subTitle: good.descriptionWap,
            imageUrl: config.imgServer + good.imageUrl,
            brandName: good.brandName,
            originPrice: good.originPrice,
            useMobilePrice:good.useMobilePrice,
            mobilePrice:good.mobilePrice,
            salesPrice: good.salesPrice
        }
    })
    return _goods
}

module.exports = {
    index: index,
    floorFilter:floorFilter,
    updateGoods:updateGoods,
    channel: channel,
    searchHistory:searchHistory,
    purgeSearchHistory:purgeSearchHistory,
    searchHotWords: searchHotWords,
    searchAssociate: searchAssociate,
    activityGood: activityGood
}
