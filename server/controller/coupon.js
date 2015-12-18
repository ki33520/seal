'use strict';

var moment = require("moment");
var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var Coupon = util.getSharedComponent("coupon");



function couponByUser(config) {
    return util.fetchAPI("couponByUser", config,true);
}

function formatCoupons(originalCoupons) {
 
    var coupons = originalCoupons.map((v,k)=>{
        v.validityDate = moment(v.validityDate).format('YYYY.MM.DD');
        v.useDate = moment(v.useDate).format('YYYY.MM.DD');
        v.issueDate = moment(v.issueDate).format('YYYY.MM.DD');
        return v;
    })
    
    return coupons;
}



var coupon = function(req, res, next) {

    var memberId = 'fc6804de4ffab221014ffd0ed2160001';
 

    //优惠券状态:0未生效,1已使用,2已过期,3可使用.4已失效(已失效，包括已使用和已过期),5有效券(有效优惠券，包括可使用和未生效)
    //是否联盟 0：非联盟,1：联盟(如果查询全部传空)
    bluebird.props({
        enableCoupons: couponByUser({
            memberId: memberId,
            isMerchants: false,
            status: 0, //0 未使用 1 已使用 2 已过期
            pageSize: 10,
            currentPage: 1
        })
    }).then(function(resp) {
        // resp = resp[0].body
        if(resp.enableCoupons.returnCode===0){
            var enableCoupons = [];

            if (resp.enableCoupons.object.result !== null && 
                resp.enableCoupons.object.result.length > 0) {
                enableCoupons = formatCoupons(resp.enableCoupons.object.result)
            }

            var initialState = {
                enableCoupons: enableCoupons,
                invalidCoupons:[],
                legueCoupons:[]
            };

            var markup = util.getMarkupByComponent(Coupon({
                initialState: initialState
            }));

            res.render('coupon', {
                markup: markup,
                initialState: initialState
            })
        }   
        
    });

}

module.exports = coupon;