'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CartApp = util.getSharedComponent("cart");

var cart = function(req, res, next) {
    var id = req.params.id;
    var user = req.session.user;

    util.fetchAPI("cartByUser",{
        memberId:"001"
    },true).then(function(ret){
        if(ret.code === "success"){
            var cart = ret.object;
            var initialState = {
                cart: cart,
            };
            var markup = util.getMarkupByComponent(CartApp({initialState:initialState}));

            res.render('cart', {
                markup: markup,
                initialState: initialState
            })
        }else{
            next(new Error(ret.msg));
        }
    })
}

module.exports = {
    cart:cart
};