'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var CartApp = util.getSharedComponent("cart");
var config = require("../lib/config.js");

function formatCarts(originalCarts) {
    var carts = [];
     _.each(originalCarts, function(originalCart) {
        var cart = {
            warehouseName: originalCart.warehouseName,
            warehouseId: originalCart.warehouseId,
            promoType:originalCart.promoType,
            promoName:originalCart.promoName,
            salesTotal:originalCart.salesTotalFee,
            promoTotal:originalCart.promoFee,
            total:originalCart.totalFee,
            qtys:originalCart.qtys,
            tax:(originalCart.tariffFee * originalCart.totalFee),
            dutyFree:originalCart.dutyFree,
            buyLimit:originalCart.buyLimit,
            checked:true,
            group:[]
        };

        _.each(originalCart.cartMKTList, function(promoList){
            var group = {
                promoType:promoList.promoType,
                promoName:promoList.promoName,
                promoFee:promoList.promoFee,
                list:[]
            }
            _.each(promoList.cartProductList,function(goods){
                var product = {
                    cartId:goods.cartId,
                    singleCode:goods.singleCode,
                    imageUrl:config.imgServer + goods.imageUrl,
                    title:goods.title,
                    props:goods.props,
                    originPrice:goods.originPrice,
                    salePrice:goods.salesPrice,
                    discount:goods.discount,
                    qty:goods.qty,
                    stockFlag:goods.stockFlag,
                    stockCount:goods.stockCount,
                    buyLimit:goods.buyLimit,
                    checked:true
                }
                group.list.push(product);
            });
            cart.group.push(group);
        });
        carts.push(cart);
    });
    return carts;
}
 
var cart = function(req, res, next) {
    var user = req.session.user;
    if(_.isObject(user)){
        util.fetchAPI("cartByUser",{
            memberId:user.memberId
        }).then(function(resp){
            if(resp.returnCode === 0){
                var initialState = {
                    carts:formatCarts(resp.object),
                    isLogined: true
                };
                var markup = util.getMarkupByComponent(CartApp({
                    initialState: initialState
                }));
                res.render('cart', {
                    markup:markup,
                    initialState:initialState
                });
            }else{
                next(new Error(resp.message));
            }
        });
    }else{
        var loginUrl = res.locals.loginUrl;
        var localcart = req.session["localcart"]||[];
        var singleCodes = [];
        var buyeds = [];
        console.log(res.locals)
        _.each(localcart,function(item){
            singleCodes.push(item.singleCode);
            buyeds.push(item.buyed);
        });
        if(singleCodes.length>0 && buyeds.length>0){
            util.fetchAPI('cartByAnonymous', {
                singleCodes:singleCodes.join(','),
                qtys:buyeds.join(',')
            }).then(function(resp) {
                if(resp.returnCode === 0){
                    var initialState = {
                        carts:formatCarts(resp.object),
                        isLogined: false,
                        loginUrl: loginUrl
                    };
                    var markup = util.getMarkupByComponent(CartApp({
                        initialState: initialState
                    }));
                    res.render('cart', {
                        markup:markup,
                        initialState:initialState
                    });
                }else{
                    next(new Error(resp.message));
                }
            })
        }else{
            var initialState = {
                carts:[]
            };
            var markup = util.getMarkupByComponent(CartApp({
                initialState: initialState
            }));
            res.render('cart', {
                markup:markup,
                initialState:initialState
            });
        }
    }
}

var updateCart = function(req, res, next) {
    var user = req.session.user;
    var singleCode = req.body.singleCode;
    var buyed = req.body.buyed;
    if(user){
        var memberId = user.memberId;
        util.fetchAPI('updateCart', {
            memberId: memberId,
            singleCode:singleCode,
            qty: buyed,
            figureUpFlag: false
        }).then(function(resp) {
            if (resp.returnCode === 0) {
                res.json({
                    isUpdated:true
                })
            } else {
                res.json({
                    isUpdated: false,
                    errMsg: resp.message
                });
            }
        });
    }else{
        var buyLimit = req.body.limit;
        var carts = req.session["localcart"];
        util.saveLocalCart(carts,{
            singleCode,
            buyed,
            buyLimit
        },true);
        res.json({
            isUpdated:true
        });
    }
}

var deleteCart = function(req, res, next) {
    var user = req.session.user;
    if(user){
        var cartId = req.body.cartId;
        var memberId = user.memberId;
        util.fetchAPI('deleteCart', {
            memberId: memberId,
            cartId: cartId
        }).then(function(resp) {
            if(resp.returnCode === 0){
                res.json({
                    isDeleted: true
                })
            } else {
                res.json({
                    isDeleted: false,
                    errMsg: resp.message
                });
            }
        }, function() {
            res.json({
                apiResponded: false
            });
        })
    }else{
        var localcart = req.session["localcart"];
        var singleCode = req.body.singleCode;
        var isDeleted = false;

        if(localcart && localcart.length>0){
            localcart.forEach(function(item,i){
                if(item.singleCode===singleCode){
                    localcart.splice(i,1);
                    isDeleted = true;
                }
            });
        }else{
            isDeleted = true;
        }

        res.json({
            isDeleted: isDeleted
        });
    }
}

var fetchCart = function(req,res,next){
    var singleCodes = req.body.singleCodes;
    var qtys = req.body.qtys;
    util.fetchAPI('cartByAnonymous', {
        singleCodes:singleCodes,
        qtys:qtys
    }).then(function(resp) {
        if(resp.returnCode === 0){
            res.json({
                isFetched: true,
                cart:formatCarts(resp.object)[0]
            });
        }else{
            res.json({
                isFetched: true,
                cart:{
                    qtys:0,
                    total:0,
                    salesTotal:0
                },
                errMsg: resp.message
            });
        }
    });
}

var checkCart = function(req,res,next){
    var user = req.session.user;
    var singleCodes = req.body.singleCodes;
    var qtys = req.body.qtys;
    util.fetchAPI('validateCartFee', {
        memberId: user.memberId,
        singleCodes:singleCodes,
        qtys: qtys
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            res.json({
                allowSubmit:true
            })
        } else {
            res.json({
                allowSubmit: false,
                errMsg: resp.message
            });
        }
    });
}

module.exports = {
    cart: cart,
    updateCart: updateCart,
    deleteCart:deleteCart,
    fetchCart:fetchCart,
    checkCart:checkCart
};