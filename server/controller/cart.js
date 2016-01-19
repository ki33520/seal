'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var CartApp = util.getSharedComponent("cart");
var config = require("../lib/config.js");

function formatCarts(originalCarts) {
    let carts = [];

     _.each(originalCarts, function(originalCart, i) {
        let cart = {
            warehouseName: originalCart.warehouseName,
            warehouseId: originalCart.warehouseId,
            price:originalCart.salesTotalFee,
            save:originalCart.promoFee,
            pay:originalCart.totalFee,
            number:originalCart.qtys,
            saveType:originalCart.promoType,
            promoName:originalCart.promoName,
            checked:true,
            itemIds:[],
            buyeds:[],
            groupList:[]
        };

        let len = 0;
        _.each(originalCart.cartMKTList, function(promoList, j){
            var group = {
                saveType:promoList.promoType,
                promoName:promoList.promoName,
                savePrice:promoList.promoFee,
                productList:[]
            }

            _.each(promoList.cartProductList,function(productList,k){
                var goods = {
                    imageUrl:config.imgServer + productList.imageUrl,
                    id:productList.singleCode,
                    title:productList.title,
                    props:productList.props,
                    originPrice:productList.originPrice,
                    price:productList.salesPrice,
                    discount:productList.discount,
                    number:productList.qty,
                    stock:productList.stockFlag,
                    limit:productList.buyLimit,
                    checked:true
                }
                len++;
                group.productList.push(goods);
                cart.itemIds.push(productList.singleCode);
                cart.buyeds.push(productList.qty);
            });

            cart.groupList.push(group);
            cart.len = len;
        });

        carts.push(cart);
    });
    
    return carts;
}
 
var cart = function(req, res, next) {
    let id = req.params.id;
    let user = req.session.user;

    util.fetchAPI("cartByUser",{
        memberId:user.memberId
    }).then(function(resp){

        if(resp.returnCode === 0){
            let carts = formatCarts(resp.object);
            let initialState = {
                carts
            };

            let markup = util.getMarkupByComponent(CartApp({
                initialState: initialState
            }));

            res.render('cart', {
                markup,
                initialState
            });
        
        }else{

            next(new Error(ret.msg));
        }
    })
}

var updateCart = function(req, res, next) {
    let user = req.session.user;
    let id = req.body.id;
    let number = req.body.number;
    let isCumulation = req.body.cumulation;

    util.fetchAPI('updateCart', {
        memberId: user.memberId,
        singleCode: id,
        qty: number,
        figureUpFlag: isCumulation
    },true).then(function(resp) {
        if (resp.returnCode === 0) {
            res.json({
                isUpdated: true
            })
        } else {
            res.json({
                isUpdated: true,
                errMsg: resp.msg
            })
        }
    }, function() {
        res.json({
            apiResponded: false
        })
    })
}

var deleteCart = function(req, res, next) {
    let cartId = req.body.cartId;
    let user = req.session.user;

    util.fetchAPI('deleteCart', {
        memberId: user.memberId,
        cartId: cartId
    },true).then(function(resp) {
        if(resp.returnCode === 0){
            res.json({
                isDeleted: true
            })
        } else {
            res.json({
                isDeleted: true,
                errMsg: resp.msg
            })
        }
    }, function() {
        res.json({
            apiResponded: false
        })
    })
}

var fetchCart = function(req, res, next) {
    let id = req.params.id;
    let user = req.session.user;
    let cartIndex = req.body.cartIndex;
    let groupIndex = req.body.groupIndex;
    let goodsIndex = req.body.goodsIndex;
  
    util.fetchAPI("cartByUser",{
        memberId:user.memberId
    },true).then(function(resp){

        if(resp.returnCode === 0){
            let carts = formatCarts(resp.object);
            let cart = carts[cartIndex];
 
            res.json({
                isFetched: true,
                cart:cart
            });
        }else{
            res.json({
                isFetched:false,
                errMsg:resp.msg
            });
        }
    });
}

var queryCart = function(req, res, next) {
    let id = req.body.id;
    let number = req.body.number;

    util.fetchAPI('queryCart', {
        singleCodes: id,
        qtys: number
    }).then(function(resp) {
        if(resp.returnCode === 0){
            let carts = formatCarts(resp.object);
            res.json({
                isFetched: true,
                carts
            })
        }
    }, function() {
        res.json({
            apiResponded: false
        })
    })
}

module.exports = {
    cart: cart,
    updateCart: updateCart,
    queryCart:queryCart,
    deleteCart:deleteCart,
    fetchCart:fetchCart
};