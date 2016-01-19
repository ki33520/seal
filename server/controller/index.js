'use strict'
var util = require("../lib/util");
var Index = util.getSharedComponent("index");
var config = require("../lib/config");
var _ = require("lodash");

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
            return channels
        } else {
            next(new Error(ret.msg))
        }
    }).then(function(channels) {
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
                    util.writePage(req.originalUrl, html)
                    res.send(html)
                });
            } else {
                next(new Error(ret.msg))
            }
        })
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
            var singleCode = activity.activityProductList[0]["singleCode"]
            jumpUrl = "/gooddetail/" + singleCode
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
        }
    })
    _floors["activityOne"] = _.result(_.findWhere(floors, {
        manageCode: "ACTIVITY_THREE"
    }), "activityList")
    _floors["activityOne"] = _.groupBy(_floors["activityOne"], "activityName");
    _floors["activityOne"] = _.mapValues(_floors["activityOne"], function(v) {
        v = v[0]
        return {
            id: v.id,
            name: v.activityName,
            jumpUrl: getJumpUrl(v),
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
    if (_floors["flashbuys"]) {
        _floors["flashbuys"] = _.map(_floors["flashbuys"][0].activityProductList, function(good) {
            return {
                singleCode: good.singleCode,
                imageUrl: config.imgServer + good.imageUrl,
                salePrice: good.salesPrice,
                originPrice: good.originPrice,
                title: good.title
            }
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
    // console.log(floors)
    return _floors
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
var searchAssociate = function(req, res, next) {
    var keyword = req.body.keyword
    util.fetchAPI("fetchAssociateKeywords", {
        searchKey: keyword
    }).then(function(ret) {
        console.log('ret')
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
            res.json({
                result: goods,
                goodFetched: true
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
            subTitle: good.subTitle,
            imageUrl: config.imgServer + good.imageUrl,
            brandName: good.brandName,
            originPrice: good.originPrice,
            salePrice: good.salesPrice
        }
    })
    return _goods
}

module.exports = {
    index: index,
    channel: channel,
    searchHotWords: searchHotWords,
    searchAssociate: searchAssociate,
    activityGood: activityGood
}
