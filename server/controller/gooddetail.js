'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var moment = require("moment");
var GoodDetailApp = util.getSharedComponent("gooddetail");
var ErrorContent = util.getSharedComponent("gooddetail", "error.jsx");
var config = require("../lib/config");

var goodDetail = function(req, res, next) {
    var singleCode = req.params.id;
    var isAuthorized = req.session.user !== undefined;
    var loginUrl = res.locals.loginUrl;
    var weixinConfig = res.locals.weixinConfig;
    console.log('weixinConfig',weixinConfig)
    var tag = req.query.tag?req.query.tag:""
    // if(req.cookies["tag"] == undefined){
    var guiderCode = req.cookies["tag"] ? req.cookies["tag"]:""
    if(guiderCode !== ""){
        loginUrl += ("&tag=" + guiderCode)
    }
    if(tag !== ""){
        loginUrl += ("&tag=" + tag)
        res.cookie("tag",tag)
    }
    var pageContent = util.readFromStaticCache(req)
    if(!process.env.HMR_ENABLED && pageContent){
        console.log("return from static cache")
        res.send(pageContent)
    }else{
        bluebird.props({
            "goodById": util.fetchCachedAPI("goodById", {
                code: singleCode,
                channel: "Mobile"
            },{maxAge:5}),
            "flashbuyByGood": util.fetchAPI("flashbuyByGood", {
                singleCode: singleCode,
                channel: "Mobile"
            }),
            "promotionsByGood": util.fetchAPI("goodPromotions", {
                singleCode: singleCode,
                channel: "Mobile"
            })
        }).then(function(ret) {
            if (ret["goodById"].returnCode === 0) {
                var good = goodFilter(ret["goodById"].object);
                var slides = good.imageUrl;
                good.slides = slides;
                good.mainImageUrl = good.imageUrl[0]
                good.comments = {list:[]}
                good.showups = {list:[]}

                var flashbuy = {
                    active: false
                }
                if (ret["flashbuyByGood"].returnCode === 0) {
                    flashbuy = flashbuyFilter(ret["flashbuyByGood"].object)
                    if (moment().isBetween(moment(flashbuy["startTime"]), moment(flashbuy["endTime"]))) {
                        flashbuy["active"] = true
                        good["buyLimit"] = 1
                    }
                    // flashbuy["endTime"] = moment("2016-04-13 16:00:00").format("x")
                }
                good.flashbuy = flashbuy;

                var promotions = {}
                if (ret["promotionsByGood"].returnCode === 0) {
                    promotions = promotionsFilter(ret["promotionsByGood"].object)
                }
                good.promotions = promotions

                var destPrice = good.salePrice
                if(good.flashbuy["active"]){
                    destPrice = good.flashbuy["price"]
                }
                if(good["useMobilePrice"] && !good.flashbuy["active"]){
                    destPrice = good["mobilePrice"]
                }
                good["destPrice"] = destPrice

                var tag = ""
                if(isAuthorized){
                    tag = req.session.user["mobileNumber"]
                }
                good["sharedQRCode"] = (config.sharedQRCodePath + "/resource/qr?code="
                 + good["code"] + "&tag=" + tag)
                if (req.xhr) {
                    res.json({
                        isFetched: true,
                        result: good
                    })
                }else{
                    if(good["version"] === 2){
                        var initialState = {
                            code: "500",
                            msg:"啊噢~您查看的商品已下架咯..."
                        };
                        var markup = util.getMarkupByComponent(ErrorContent({
                            initialState: initialState
                        }));

                        res.render('gooddetail', {
                            markup: markup,
                            initialState: initialState
                        });
                    }else{
                        var initialState = {
                            good: good,
                            isAuthorized:isAuthorized,
                            loginUrl:loginUrl,
                            weixinConfig:weixinConfig
                        }
                        var markup = util.getMarkupByComponent(GoodDetailApp({
                            initialState: initialState
                        }));
                        res.render('gooddetail', {
                            markup: markup,
                            initialState: initialState
                        },function(err,html){
                            util.writeToStaticCache(req,html)
                            res.send(html)
                        })
                    }
                }
            } else {
                if (req.xhr) {
                    res.json({
                        isFetched: false,
                        errMsg: ret["goodById"].message
                    })
                }else{
                    next(new Error(ret["goodById"].message))
                }
            }
        }).error(function() {
            if (req.xhr) {
                res.json({
                    isFetched: false,
                    errMsg: "api request failed"
                })
            }else{
                next(new Error('api request failed'))
            }
        })
    }
}

function flashbuyFilter(flashbuy) {
    var _flashbuy = {
        active:false
    };
    if (flashbuy) {
        _flashbuy["price"] = flashbuy.wapPrice
        _flashbuy["startTime"] = moment(new Date(flashbuy.beginDate)).format("YYYY-MM-DD HH:mm:ss")
        _flashbuy["endTime"] = moment(new Date(flashbuy.endDate)).format("YYYY-MM-DD HH:mm:ss")
    }
    return _flashbuy
}

function promotionsFilter(promotions) {
    var _promotions = {};
    _.each(promotions,function(v,k){
        var promotionType = ""
        // console.log('k',k)
        switch(k){
            case "MONEYMONEY":
                promotionType = "满减"
                break
            case "MONEYDISC":
                promotionType = "满折"
                break
        }
        _promotions[promotionType] = v
    })
    return _promotions
}

function goodFilter(good) {
    var _good = _.pick(good, [
        "code", "discount", "isMain", "title", "subTitle", "detail",
        "buyLimit", "sourceAreaId", "useMobilePrice", "mobilePrice",
        "useTaxRate","consumerTax","addedTax",
        "useInlandLogistics", "useOutlandLogistics", "outlandLogisticsFee",
        "description","isMeiZhuang","version","canAddCart"
    ]);
    _good["imageUrl"] = _.map(good.picList, function(imageUrl) {
        return config.imgServer + imageUrl
    })
    _good["detail"] = _.escape(_good["detail"])
    _good["buyed"] = good.minAmount || 1
    _good["buyedMinimum"] = good.minAmount || 1
    _good["buyedStep"] = good.addCount || 1
    _good["showTaxRate"] = (good.showTaxRate * 100)
    _good["consumerTax"] = (good["showConsumerTax"] * 100)
    _good["addedTax"] = (good["showAddedTax"] * 100)
    _good["productCode"] = good.groupCode
    _good["salePrice"] = good.salesPrice
    _good["originPrice"] = good.originPrice
    _good["stock"] = good.stock.stock
    _good["originName"] = good.sourceArea.name
    _good["originFlag"] = config.imgServer + good.sourceArea.imageUrl
    _good["warehouseName"] = good.wareHouse.name
    var selectedItem = null;
    _good["items"] = _.map(good.groups, function(group) {
        return {
            attrs: group.fattrs,
            code: group.code,
            stock: group.stock ? group.stock.stock : null
        }
    })
    var attrs = {}
    var keys = _.keys(_good["items"][0].attrs)
    _.each(keys, function(key) {
        attrs[key] = []
    })
    var selectedItem = null
    _.each(_good["items"], function(item) {
        if (item.code === _good['code']) {
            selectedItem = item
        }
        _.each(attrs, function(v, k) {
            v.push(item.attrs[k])
            attrs[k] = _.uniq(v)
        })
    })
    attrs = _.mapValues(attrs, function(attrValues, attrName) {
            attrValues = _.map(attrValues, function(value) {
                let _value = {
                    value: value,
                    selected: false,
                    disabled: false
                }
                return _value
            })
            return attrValues
        })
        // _good["isCollected"] = false
    _good["selectedItem"] = selectedItem
    _good["attrs"] = attrs;
    return _good
}

var addCart = function(req, res, next) {
    var singleCode = req.query.singlecode;
    var buyed = req.query.buyed;
    var buyLimit = req.query.buylimit;
    var user = req.session.user;
    if (user) {
        util.fetchAPI("updateCart", {
            memberId: user.memberId,
            singleCode: singleCode,
            qty: buyed,
            figureUpFlag: true,
            channel: "Mobile"
        }).then(function(ret) {
            if (ret.returnCode === 0) {
                res.json({
                    cartAdded: true
                })
            } else {
                res.json({
                    cartAdded: false,
                    errMsg: ret.message
                })
            }
        })
    } else {
        var isExceed = util.isLocalCartLimitExceed(req.session["localcart"], {
            singleCode: singleCode,
            buyed: buyed,
            buyLimit: buyLimit
        }, false)
        if (isExceed) {
            res.json({
                cartAdded: false,
                errMsg: "商品超过限购数量!"
            })
        } else {
            var localcart = util.saveLocalCart(req.session["localcart"], {
                singleCode: singleCode,
                buyed: buyed,
                buyLimit: buyLimit
            }, false)
            req.session["localcart"] = localcart
            res.json({
                cartAdded: true,
            })
        }
    }
}

var cartCount = function(req, res, next) {
    var user = req.session.user
    if (user) {
        util.fetchAPI("cartCount", {
            memberId: user.memberId,
        }).then(function(ret) {
            if (ret.returnCode === 0) {
                res.json({
                    result: ret.object,
                    isFetched: true
                })
            } else {
                res.json({
                    isFetched: false,
                    errMsg: ret.message
                })
            }
        })
    } else {
        res.json({
            isFetched: true,
            result: util.getLocalCartCount(req.session["localcart"])
        })
    }
}

var toggleCollected = function(req, res, next) {
    var user = req.session.user
    var singleCode = req.query.singleCode
    var productCode = req.query.productCode
    var status = req.query.status
    if (user) {
        var toggleCollectedRequest = (status === "true") ? util.fetchAPI("addCollected", {
            memberId: user.memberId,
            singleCode: singleCode,
            productCode: productCode,
            inserter: user.mobileNumber
        }) : util.fetchAPI("removeCollected", {
            memberId: user.memberId,
            singleCode: singleCode,
            operatorName: user.mobileNumber
        })
        toggleCollectedRequest.then(function(ret) {
            if (ret.returnCode === 0) {
                res.json({
                    result: true,
                    isToggled: true
                })
            } else {
                res.json({
                    isToggled: false,
                    errMsg: ret.message
                })
            }
        })
    } else {
        res.json({
            isToggled: false,
            errMsg: "请先登录"
        })
    }
}

var isCollected = function(req, res, next) {
    var user = req.session.user
    var singleCode = req.query.singleCode
    if (user) {
        util.fetchAPI("isCollected", {
            memberId: user.memberId,
            singleCode: singleCode,
        }).then(function(ret) {
            if (ret.returnCode === 0) {
                res.json({
                    result: ret.object,
                    isFetched: true
                })
            } else {
                res.json({
                    isFetched: false,
                    errMsg: ret.message
                })
            }
        })
    } else {
        res.json({
            isFetched: true,
            result: null
        })
    }
}

var goodComments = function(req, res, next) {
    var productCode = req.query.productCode;
    var hasImage = req.query.hasImage;
    var pageIndex = req.query.pageIndex || 1;
    var pageSize = 4;
    util.fetchCachedAPI("commentByGood", {
        productCode: productCode,
        hasImage:hasImage,
        pageNo: pageIndex,
        pageSize: pageSize
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            var comments = commentsFilter(ret.object)
            var pagination = {list:comments["list"]}
            pagination["totalCount"] = comments["totalCount"]
            pagination["pageIndex"] = pageIndex
            pagination["totalPage"] = Math.ceil(comments["totalCount"] / pageSize)
            res.json({
                commentsFetched: true,
                pagination:pagination
            })
        } else {
            res.json({
                commentsFetched: false,
                errMsg: ret.message
            })
        }
    }, function() {
        res.json({
            commentsFetched: false,
            errMsg: "api request failed"
        })
    })
}

function commentsFilter(comments) {
    var _comments = _.pick(comments, ["totalCount"])
    _comments["list"] = []
    _.each(comments.result, function(comment, i) {
        var _comment = _.pick(comment, [
            "memberId", "productCode", "productName",
            "singleCode",
            "content", "rate", "isView", "isOpen", "nickName"
        ])
        _comment["avatar"] = comment["headImage"]
        _comment["commentImages"] = comment["imageUrlList"] ? _.map(comment["imageUrlList"], function(v, i) {
            return config.imgServer + v
        }) : []
        _comment["productImage"] = config.imgServer + comment.singleImage;
        _comment["createdAt"] = moment(new Date(comment.createdAt).getTime()).format("YYYY-MM-DD HH:mm:ss")
            // console.log('createAt',comment["createdAt"])
        _comments["list"].push(_comment)
    })
    // _comments["showup"] = _.filter(_comments["list"], function(v) {
    //     return v["commentImages"].length > 0
    // })
    return _comments
}

module.exports = {
    goodDetail: goodDetail,
    addCart: addCart,
    toggleCollected: toggleCollected,
    isCollected: isCollected,
    cartCount: cartCount,
    goodComments: goodComments
};
