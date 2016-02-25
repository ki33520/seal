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

            _.each(promoList.cartProductList,function(product){
                var goods = {
                    cartId:product.cartId,
                    singleCode:product.singleCode,
                    imageUrl:config.imgServer + product.imageUrl,
                    title:product.title,
                    props:product.props,
                    originPrice:product.originPrice,
                    salePrice:product.salesPrice,
                    discount:product.discount,
                    qty:product.qty,
                    stockFlag:product.stockFlag,
                    buyLimit:product.buyLimit,
                    checked:true
                }

                group.list.push(goods);
            });

            cart.group.push(group);
        });

        carts.push(cart);
    });
    
    return carts;
}
 
var cart = function(req, res, next) {
    var user = req.session.user;
    var markup,initialState,carts;
    if(user){
        util.fetchAPI("cartByUser",{
            memberId:user.memberId
        }).then(function(resp){
            if(resp.returnCode === 0){
                carts = formatCarts(resp.object);
                initialState = {
                    carts:carts
                };
                markup = util.getMarkupByComponent(CartApp({
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
        var localcart = req.session["localcart"]||[];
        var singleCodes = [];
        var buyeds = [];
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
                    carts=formatCarts(resp.object);
                    initialState = {
                        carts:carts
                    };
                    markup = util.getMarkupByComponent(CartApp({
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
            initialState = {
                carts:[]
            };
            markup = util.getMarkupByComponent(CartApp({
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
    var buyed = req.body.qty;
    var singleCodes = req.body.singleCodes;
    var qtys = req.body.qtys;
    var buyLimit = req.body.buyLimit;
 
    if(buyed-buyLimit>0){
        res.json({
            isUpdated:false
        });
        return false;
    }

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
    if(singleCodes!==''||qtys!==''){
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
                    isFetched: false,
                    errMsg: resp.message
                });
            }
        });
    }else{
        res.json({
            isFetched: false
        });
    }
}

module.exports = {
    cart: cart,
    updateCart: updateCart,
    deleteCart:deleteCart,
    fetchCart:fetchCart
};