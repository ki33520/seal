'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var CartApp = util.getSharedComponent("cart");
var config = require("../lib/config.js");

function formatCarts(originalCarts) {
    var carts = [];

     _.each(originalCarts, function(originalCart, i) {
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

        _.each(originalCart.cartMKTList, function(promoList, j){
            var group = {
                promoType:promoList.promoType,
                promoName:promoList.promoName,
                promoFee:promoList.promoFee,
                list:[]
            }

            _.each(promoList.cartProductList,function(product,k){
                var goods = {
                    cartId:product.cartId,
                    imageUrl:config.imgServer + product.imageUrl,
                    id:product.singleCode,
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
    var markup,initialState;
    if(user){
        util.fetchAPI("cartByUser",{
            memberId:user.memberId
        }).then(function(resp){
            if(resp.returnCode === 0){
                var carts = formatCarts(resp.object);
                initialState = {
                    carts:carts,
                    authorize:true
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
            carts:[],
            authorize:false
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

var updateCart = function(req, res, next) {
    var user = req.session.user;
    var singleCode = req.body.singleCode;
    var qty = req.body.qty;
    var figureUpFlag = req.body.figureUpFlag;

    util.fetchAPI('updateCart', {
        memberId: user.memberId,
        singleCode:singleCode,
        qty: qty,
        figureUpFlag: figureUpFlag
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            res.json({
                isUpdated: true
            })
        } else {
            res.json({
                isUpdated: false,
                errMsg: resp.message
            })
        }
    });
}

var deleteCart = function(req, res, next) {
    var cartId = req.body.cartId;
    var user = req.session.user;

    util.fetchAPI('deleteCart', {
        memberId: user.memberId,
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
            })
        }
    }, function() {
        res.json({
            apiResponded: false
        })
    })
}
 
var calculatePrice = function(req, res, next) {
    var singleCodes = req.body.singleCodes;
    var qtys = req.body.qtys;

    util.fetchAPI('calculatePrice', {
        singleCodes,
        qtys
    }).then(function(resp) {
        if(resp.returnCode === 0){
            res.json({
                isFetched: true,
                carts:formatCarts(resp.object)
            })
        }else{
            res.json({
                isFetched: false,
                errMsg: resp.message
            })
        }
    })
}

var getCart = function(req, res, next) {
    var user = req.session.user;
    util.fetchAPI("cartByUser",{
        memberId:user.memberId
    }).then(function(resp){

        if(resp.returnCode === 0){
            var carts = formatCarts(resp.object);
            res.json({
                carts:carts,
                isFetched:true
            });
            
        }else{
            res.json({
                carts:[],
                isFetched:false
            })
        }
    })
}


module.exports = {
    cart: cart,
    updateCart: updateCart,
    calculatePrice:calculatePrice,
    deleteCart:deleteCart,
    getCart:getCart
};