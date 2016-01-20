'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var GoodDetailApp = util.getSharedComponent("gooddetail");
var config = require("../lib/config");

var goodDetail = function(req, res, next) {
    var id = req.params.id;
    util.fetchAPI("goodById", {
        code: id,
        channel: "Mobile"
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            var good = goodFilter(ret.object);
            var slides = good.imageUrl;
            // slides = slides.map(function(slide) {
            //     return slide.replace("imgtest.", "img.") + "@500w_500h_4e";
            // })
            good.slides = slides;
            good.mainImageUrl = good.imageUrl[0]
            var cartCount = "";
            // if(resp.cartByUser !== false && resp.cartByUser.code === "ok"){
            //     cartCount = resp.cartByUser.page.totalCount > 0?
            //     serverUtil.calculateCart(resp.cartByUser):"";
            // }

            var initialState = {
                good: good,
                cartCount: cartCount
            };
            var markup = util.getMarkupByComponent(GoodDetailApp({
                initialState: initialState
            }));

            res.render('gooddetail', {
                markup: markup,
                initialState: initialState
            })
        } else {
            next(new Error(ret.msg));
        }
    })
}

function goodFilter(good) {
    var _good = _.pick(good, [
        "code","discount", "isMain", "title", "subTitle", "detail",
        "buyLimit", "taxRate", "sourceAreaId",
        "useTaxRate", "useInlandLogistics", "useOutlandLogistics", "outlandLogisticsFee",
        "description", "showTaxRate", "addCount"
    ]);
    _good["imageUrl"] = _.map(good.picList, function(imageUrl) {
        return config.imgServer + imageUrl
    })
    _good["productCode"] = good.groupCode
    _good["salePrice"] = good.salesPrice
    _good["originPrice"] = good.originPrice
    _good["stock"] = good.stock.localStock
    _good["warehouse"] = good.wareHouse.name
    var selectedItem = null;
    _good["items"] = _.map(good.groups, function(group) {
        return {
            attrs: group.fattrs,
            code: group.code,
            stock: group.stock?group.stock.localStock:null
        }
    })
    var attrs = {}
    var keys = _.keys(_good["items"][0].attrs)
    _.each(keys, function(key) {
        attrs[key] = {
            selectedValue:null,
            attrValues:[]
        }
    })
    var selectedItem = null
    _.each(_good["items"], function(item) {
            if(item.code === _good['code']){
                selectedItem = item
            }
            _.each(attrs, function(v, k) {
                v["attrValues"].push(item.attrs[k])
                attrs[k]["attrValues"] = _.uniq(v["attrValues"])
            })
        })
    attrs = _.map(attrs,function(attr,k){
        attr.attrName = k
        attr.attrValues = _.map(attr.attrValues,function(value){
            return {
                value:value,
                disabled:false
            }
        });
        if(selectedItem !== null){
            attr.selectedValue = _.findWhere(attr.attrValues,{value:selectedItem.attrs[k]})
        }
        return attr
    })
    // _good["isCollected"] = false
    _good["selectedItem"] = selectedItem
    _good["attrs"] = attrs;
    return _good
}

var fetchGood = function(req, res, next) {
    var id = req.params.id;
    util.fetchAPI("goodById", {
        code: id,
        channel: "Mobile"
    }).then(function(ret) {
        if (ret.returnCode === 0) {
            var good = goodFilter(ret.object);
            var slides = good.imageUrl;
            good.slides = slides;
            res.json({
                result:good,
                isFetched:true
            })
        } else {
            res.json({
                isFetched:false,
                errMsg:ret.msg
            })
        }
    })

}

var addCart = function(req, res, next) {
    var itemId = req.query.itemId;
    var buyed = req.query.buyed;
    var user = req.session.user;
    util.fetchAPI("updateCart", {
        memberId:user.memberId,
        singleCode: itemId,
        qty:buyed,
        figureUpFlag:true,
        channel: "Mobile"
    }).then(function(ret) {
        // console.log('ret',ret)
        if (ret.returnCode === 0) {
            res.json({
                cartAdded:true
            })
        } else {
            res.json({
                cartAdded:false,
                errMsg:ret.msg
            })
        }
    })
}

var cartCount = function(req,res,next){
    var user = req.session.user
    if(user){
        util.fetchAPI("cartCount", {
            memberId:user.memberId,
        }).then(function(ret) {
            if (ret.returnCode === 0) {
                res.json({
                    result:ret.object,
                    isFetched:true
                })
            } else {
                res.json({
                    isFetched:false,
                    errMsg:ret.msg
                })
            }
        })
    }else{
        res.json({
            isFetched:true,
            result:null
        })
    }
}

var toggleCollected = function(req,res,next){
    var user = req.session.user
    var singleCode = req.query.singleCode
    var productCode = req.query.productCode
    var status = req.query.status
    if(user){
        util.fetchAPI(status?"removeCollected":"addCollected", {
            memberId:user.memberId,
            singleCode:singleCode,
            productCode:productCode
        }).then(function(ret) {
            if (ret.returnCode === 0) {
                res.json({
                    result:ret.object,
                    isToggled:true
                })
            } else {
                res.json({
                    isToggled:false,
                    errMsg:ret.msg
                })
            }
        })
    }else{
        res.json({
            isToggled:true,
            result:null
        })
    }
}

var isCollected = function(req,res,next){
    var user = req.session.user
    var singleCode = req.query.singleCode
    if(user){
        util.fetchAPI("isCollected", {
            memberId:user.memberId,
            singleCode:singleCode,
        }).then(function(ret) {
            if (ret.returnCode === 0) {
                res.json({
                    result:ret.object,
                    isFetched:true
                })
            } else {
                res.json({
                    isFetched:false,
                    errMsg:ret.msg
                })
            }
        })
    }else{
        res.json({
            isFetched:true,
            result:null
        })
    }

}

module.exports = {
    goodDetail:goodDetail,
    addCart:addCart,
    toggleCollected:toggleCollected,
    isCollected:isCollected,
    cartCount:cartCount,
    fetchGood:fetchGood
};
