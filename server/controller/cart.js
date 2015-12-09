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
            
        }else{
            next(new Error(ret.msg));
        }
    })
}

module.exports = {
    cart:cart
};