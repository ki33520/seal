'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var Coupon = util.getSharedComponent("coupon");

var coupon = function(req, res, next) {

    var pageIndex = req.query.pageIndex || 1;
    bluebird.props({
        coupon: util.fetchAPI("couponByUser", {
            pageIndex: pageIndex,
            pageSize: 12
        }, true)
    }).then(function(resp) {
        // resp = resp[0].body
        if (resp.coupon.code === "success") {
             
            if (req.xhr === true) {
                res.json(resp);
            } else {
                 
                var initialState = {
                    enableCoupons: [],
                    invalidCoupons: [],
                    legueCoupons: []
                };

                var markup = util.getMarkupByComponent(Coupon({
                    initialState: initialState
                }));

                res.render('coupon', {
                    markup: markup,
                    initialState: initialState
                })
            }
        } else {
            next(new Error(resp.msg));
        }
    },function(){
       console.log('error')
    });

}



module.exports = coupon;