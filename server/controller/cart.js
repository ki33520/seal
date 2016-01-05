'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var CartApp = util.getSharedComponent("cart");

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
                    imageUrl:productList.imageUrl,
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
    var id = req.params.id;
    var user = req.session.user;

    util.fetchAPI("cartByUser",{
        memberId:user.memberId
    },true).then(function(resp){

        if(resp.returnCode === 0){
            var carts = formatCarts(resp.object);
            var initialState = {
                carts
            };

            var markup = util.getMarkupByComponent(CartApp({
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
    var user = req.session.user;
    var id = req.body.id;
    var number = req.body.number;
    var isCumulation = req.body.cumulation;

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
    var cartId = req.body.cartId;
    var user = req.session.user;

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
    var id = req.params.id;
    var user = req.session.user;
    var cartIndex = req.body.cartIndex;
    var groupIndex = req.body.groupIndex;
    var goodsIndex = req.body.goodsIndex;
  
    util.fetchAPI("cartByUser",{
        memberId:user.memberId
    },true).then(function(resp){

        if(resp.returnCode === 0){
            var carts = formatCarts(resp.object);
            var cart = carts[cartIndex];
 
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

module.exports = {
    cart: cart,
    updateCart: updateCart,
    deleteCart:deleteCart,
    fetchCart:fetchCart
};