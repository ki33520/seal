'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var CouponDetail = util.getSharedComponent("coupondetail");

var couponDetail = function(req, res, next) {
    //var config = req.app.locals.config;
    //var user = req.session.user;
    //var couponNo = req.params.id;

    bluebird.props({
        coupon: util.fetchAPI("coupondetail", {
            productId: 'id'
        },true)
    }).then(function(resp) {
     
        if (resp.coupon.code === "success") {

            var initialState = {
                coupon: {}
            };
            var markup = util.getMarkupByComponent(CouponDetail({
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