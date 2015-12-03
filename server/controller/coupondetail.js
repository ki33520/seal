'use strict';

var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var CouponDetail = util.getSharedComponent("coupondetail");

var couponDetail = function(req, res, next) {
    //var config = req.app.locals.config;
    //var user = req.session.user;
    //var couponNo = req.params.id;

    bluebird.props({
        coupon: util.fetchAPI("coupon", {
            memberId: 'user.memberId',
            couponNo: 'couponNo'
        }, true)
    }).then(function(resp) {
     
        if (resp.code === "success") {
             

            var initialState = {
                coupon: {}
            };
            var markup = util.getMarkupByComponent(Coupon({
                initialState: initialState
            }));
            res.render('coupondetail', {
                markup: markup,
                initialState: initialState
            })
        }else{
            next(new Error(resp.msg));
        }
    })
}



module.exports = couponDetail;