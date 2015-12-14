'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CartApp = util.getSharedComponent("cart");

 
var cart = function(req, res, next) {
    var id = req.params.id;
    var user = req.session.user;
    var memberId = '90a19c2d49184fefa7421c5d7eacf551';

    util.fetchAPI("cartByUser",{
        memberId:memberId
    },true).then(function(resp){
        if(resp.returnCode === 0){
            if (req.xhr === true) {
                res.json(resp);
            }else{
                var initialState = {
                    isFetched: true,
                    carts: resp.object
                };

                var markup = util.getMarkupByComponent(CartApp({
                    initialState: initialState
                }));

                res.render('cart', {
                    markup: markup,
                    initialState: initialState
                });
            }
            
        }else{
            next(new Error(ret.msg));
        }
    })
}

var updateCart = function(req, res, next) {
    var user = req.session.user;
    var singleCode = req.body.singleCode;
    var qty = req.body.qty;
 
    util.fetchAPI('updateCart', {
        memberId: '90a19c2d49184fefa7421c5d7eacf551',
        singleCode: singleCode,
        qty: qty,
        figureUpFlag: false
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
        memberId: '90a19c2d49184fefa7421c5d7eacf551',
        cartId: cartId
    },true).then(function(resp) {
        if (resp.code === "success") {
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

module.exports = {
    cart: cart,
    updateCart: updateCart,
    deleteCart:deleteCart
};