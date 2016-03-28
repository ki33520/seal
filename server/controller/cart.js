'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var CartApp = util.getSharedComponent("cart");
var config = require("../lib/config.js");

function checkIsAllowSubmit(cart){
    if(cart.buyeds<1){
        return false;
    }
    if(cart.total <0.07){
        return false;
    }
    if(cart.total > cart.buyLimit&&cart.buyeds>1 && cart.hasRate===true){
        return false;
    }
    return true;
}
function formatCarts(originalCarts) {
    var carts = [];
    _.each(originalCarts, function(originalCart) {
        var cart = {
            warehouseName: originalCart.warehouseName,
            warehouseId: originalCart.warehouseId,
            promoType: originalCart.promoType,
            promoName: originalCart.promoName,
            salesTotal: originalCart.salesTotalFee,
            promoTotal: originalCart.promoFee,
            total: originalCart.totalFee,
            buyeds: originalCart.qtys,
            tariffFee: originalCart.tariffFee,
            dutyFree: originalCart.dutyFree,
            buyLimit: originalCart.buyLimit,
            hasRate:originalCart.hasRate,
            totalTax:0,
            group: []
        };
        var collected = 0;
        var children = 0;
        var totalTax = 0;
        _.each(originalCart.cartMKTList, function(promoList) {
            var group = {
                promoType: promoList.promoType,
                promoName: promoList.promoName,
                promoFee: promoList.promoFee,
                list: []
            }
            _.each(promoList.cartProductList, function(goods) {
                children++;
                var product = {
                    cartId: goods.cartId,
                    singleCode: goods.singleCode,
                    imageUrl: config.imgServer + goods.imageUrl,
                    title: goods.title,
                    props: goods.props,
                    originPrice: goods.originPrice,
                    salePrice: goods.salesPrice,
                    discount: goods.discount,
                    buyed: goods.qty,
                    stockFlag: goods.stockFlag,
                    stockCount: goods.stockCount,
                    maxBuy: Math.min(goods.buyLimit,goods.stockCount),
                    onSale: goods.version===1,
                    minStep: goods.minBuyCount,
                    step: goods.addCount,
                    isAutoUpdated: goods.hasSystemUpQty,
                    updateCase: goods.systemUpType,
                    checked: false
                }
                if (product.stockFlag && product.onSale) {
                    product.checked = true;
                    totalTax += parseInt(goods.taxRate * goods.salesPrice*100)/100;
                    collected++;
                }
                group.list.push(product);
            });
            cart.checked = (collected === children) ? true : false;
            cart.children = children;
            cart.collected = collected;
            cart.totalTax = totalTax;
            cart.isAllowSubmit = checkIsAllowSubmit(cart);
            cart.group.push(group);
        });
        carts.push(cart);
    });
    return carts;
}

var cart = function(req, res, next) {
    var user = req.session.user;
    var isLogined = (user && user.memberId)? true:false;
    var loginUrl = res.locals.loginUrl;
    var renderMarkup = function(arr) {
        var initialState = {
            carts: formatCarts(arr),
            isLogined: isLogined,
            loginUrl: loginUrl
        };
        var markup = util.getMarkupByComponent(CartApp({
            initialState: initialState
        }));
        res.render('cart', {
            markup: markup,
            initialState: initialState
        });
    };
    if (isLogined) {
        util.fetchAPI("cartByUser", {
            memberId: user.memberId
        }).then(function(resp) {
              if (resp.returnCode === 0) {
                renderMarkup(resp.object);
              } else {
                next(new Error(resp.message));
              }
        });
    } else {
        var localcart = req.session["localcart"];
        if (localcart && localcart.length > 0) {
             var singleCodes = [];
             var buyeds = [];
              _.each(localcart, function(item) {
                    singleCodes.push(item.singleCode);
                    buyeds.push(item.buyed);
              });
            util.fetchAPI('cartByAnonymous', {
                singleCodes: singleCodes.join(','),
                qtys: buyeds.join(',')
            }).then(function(resp) {
                if (resp.returnCode === 0) {
                    renderMarkup(resp.object);
                } else {
                    next(new Error(resp.message));
                }
            })
        } else {
            renderMarkup([]);
        }
    }
}

var updateCart = function(req, res, next) {
    var user = req.session.user;
    var singleCode = req.body.singleCode;
    var buyed = req.body.buyed;
    var isLogined = (user && user.memberId)? true:false;
    var respone = function(isUpdated){
        res.json({
            isUpdated: isUpdated
        });
    }
    if (isLogined) {
        util.fetchAPI('updateCart', {
            memberId: user.memberId,
            singleCode: singleCode,
            qty: buyed,
            figureUpFlag: false
        }).then(function(resp) {
            var isUpdated = resp.returnCode === 0;
            respone(isUpdated);
        });
    } else {
        var maxBuy = req.body.maxBuy;
        var carts = req.session["localcart"]||[];
        util.saveLocalCart(carts, {
            singleCode:singleCode,
            buyed:buyed,
            buyLimit:maxBuy,
        }, true);
        respone(true);
    }
}

var deleteCart = function(req, res, next) {
    var user = req.session.user;
    var isLogined = (user && user.memberId)? true:false;
    var respone = function(isDeleted){
        res.json({
            isDeleted: isDeleted
        });
    }
    if (isLogined) {
        util.fetchAPI('deleteCart', {
            memberId: user.memberId,
            cartId: req.body.cartId
        }).then(function(resp) {
            var isDeleted = resp.returnCode === 0;
            respone(isDeleted);
        }, function() {
            respone(false);
        })
    } else {
        var localcart = req.session["localcart"];
        var singleCode = req.body.singleCode;
        var isDeleted = false;
        if (localcart && localcart.length > 0) {
            localcart.forEach(function(item, i) {
                if (item.singleCode === singleCode) {
                    localcart.splice(i, 1);
                    isDeleted = true;
                }
            });
        } 
        respone(isDeleted);
    }
}

var fetchCart = function(req, res, next) {
    var user = req.session.user;
    var singleCodes = req.body.singleCodes;
    var buyeds = req.body.buyeds;
   // var isLogined = (user && user.memberId) ? true : false;
    var respone = function(cart, isFetched) {
        res.json({
            cart: cart,
            isFetched: isFetched
        })
    }
    if(singleCodes==='' || buyeds===''){
        return respone([{
            promoType: null,
            promoName: 0,
            salesTotal: 0,
            promoTotal: 0,
            total: 0,
            buyeds: 0,
            tariffFee: 0,
            dutyFree: 0,
            buyLimit: 0,
            collected:0,
            isAllowSubmit:false
        }],true);
    }
    util.fetchAPI('cartByAnonymous', {
        singleCodes: singleCodes,
        qtys: buyeds
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            var cart = formatCarts(resp.object);
            respone(cart, true);
        } else {
            respone(null, false);
        }
    });
}

var checkCart = function(req, res, next) {
    var user = req.session.user;
    var singleCodes = req.body.singleCodes;
    var buyeds = req.body.buyeds;
    util.fetchAPI('validateCartFee', {
        memberId: user.memberId,
        singleCodes: singleCodes,
        qtys: buyeds
    }).then(function(resp) {
        var returnCode = resp.returnCode;
        res.json({
            returnCode:returnCode
        })
    });
}

module.exports = {
    cart: cart,
    updateCart: updateCart,
    deleteCart: deleteCart,
    fetchCart: fetchCart,
    checkCart: checkCart
};