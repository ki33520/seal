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
            promoType: originalCart.promoType,
            promoName: originalCart.promoName,
            salesTotal: originalCart.salesTotalFee,
            promoTotal: originalCart.promoFee,
            total: originalCart.totalFee,
            buyeds: originalCart.qtys,
            tariffFee: originalCart.tariffFee,
            dutyFree: originalCart.dutyFree,
            buyLimit: originalCart.buyLimit,
            group: []
        };
        var collected = 0;
        var children = 0;
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
                    buyLimit: goods.buyLimit,
                    "onSale": goods.version,
                    "minBuyStep": goods.minBuyCount,
                    "buyedStep": goods.addCount,
                    "isAutoUpdated": goods.hasSystemUpQty,
                    "updateCase": goods.systemUpType
                }
                if(product.buyed > 0  && product.onSale==1){
                    product.checked = true;
                    collected++;
                }
                group.list.push(product);
            });
            cart.checked = (collected === children) ? true: false;
            cart.children = children;
            cart.collected=collected;
            cart.group.push(group);
        });
        carts.push(cart);
    });
    return carts;
}

var cart = function(req, res, next) {
    var user = req.session.user;
    var renderMarkup = function(initialState) {
        var markup = util.getMarkupByComponent(CartApp({
            initialState: initialState
        }));
        res.render('cart', {
            markup: markup,
            initialState: initialState
        });
    };
    if (user && user.memberId) {
        util.fetchAPI("cartByUser", {
            memberId: user.memberId
        }).then(function(resp) {
            if (resp.returnCode === 0) {
                renderMarkup({
                    carts: formatCarts(resp.object),
                    isLogined: true
                });
            } else {
                next(new Error(resp.message));
            }
        });
    } else {
        var loginUrl = res.locals.loginUrl;
        var localcart = req.session["localcart"] || [];
        var singleCodes = [];
        var buyeds = [];
        _.each(localcart, function(item) {
            singleCodes.push(item.singleCode);
            buyeds.push(item.buyed);
        });
        if (singleCodes.length > 0 && buyeds.length > 0) {
            util.fetchAPI('cartByAnonymous', {
                singleCodes: singleCodes.join(','),
                qtys: buyeds.join(',')
            }).then(function(resp) {
                if (resp.returnCode === 0) {
                    renderMarkup({
                        carts: formatCarts(resp.object),
                        isLogined: false,
                        loginUrl: loginUrl
                    });
                } else {
                    next(new Error(resp.message));
                }
            })
        } else {
            renderMarkup({
                carts: []
            });
        }
    }
}

var updateCart = function(req, res, next) {
    var user = req.session.user;
    var singleCode = req.body.singleCode;
    var buyed = req.body.buyed;
    if (user && user.memberId) {
        util.fetchAPI('updateCart', {
            memberId: user.memberId,
            singleCode: singleCode,
            qty: buyed,
            figureUpFlag: false
        }).then(function(resp) {
            if (resp.returnCode === 0) {
                res.json({
                    isUpdated: true
                })
            } else {
                res.json({
                    isUpdated: false,
                    errMsg: resp.message
                });
            }
        });
    } else {
        var buyLimit = req.body.limit;
        var carts = req.session["localcart"];
        util.saveLocalCart(carts, {
            singleCode,
            buyed,
            buyLimit
        }, true);
        res.json({
            isUpdated: true
        });
    }
}

var deleteCart = function(req, res, next) {
    var user = req.session.user;
    if (user && user.memberId) {
        util.fetchAPI('deleteCart', {
            memberId: user.memberId,
            cartId: req.body.cartId
        }).then(function(resp) {
            if (resp.returnCode === 0) {
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
                isDeleted: false,
                apiResponded: false
            });
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
        } else {
            isDeleted = true;
        }

        res.json({
            isDeleted: isDeleted
        });
    }
}

var fetchCart = function(req, res, next) {
    var user = req.session.user;
    var singleCodes = req.body.singleCodes;
    var buyeds = req.body.buyeds;
    if (singleCodes === "" || buyeds === "") {
        res.json({
            isFetched: true,
            cart: null
        });
    } else {
        util.fetchAPI('cartByAnonymous', {
            singleCodes: singleCodes,
            qtys: buyeds
        }).then(function(resp) {
            if (resp.returnCode === 0) {
                res.json({
                    isFetched: true,
                    cart: formatCarts(resp.object)[0]
                });
            } else {
                res.json({
                    isFetched: false,
                    errMsg: resp.message
                });
            }
        });
    }
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
        if (resp.returnCode === 0) {
            res.json({
                allowSubmit: true
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
    deleteCart: deleteCart,
    fetchCart: fetchCart,
    checkCart: checkCart
};