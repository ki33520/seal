'use strict';

//var moment = require("moment");
var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var Coupon = util.getSharedComponent("coupon");
var pageSize = 10;

function couponByUser(config) {
    return util.fetchAPI("couponByUser", config,true);
}

function formatCoupons(originalCoupons) {
    var site={
            tepin:"特品汇www.tepin.com",
            hnmall:"农博汇www.hnmall.com",
            haitao:"海外购www.tepin.hk"
        };
    var coupons = originalCoupons.map((v,k)=>{
        //v.validityDate = moment(v.validityDate,'YYYY-MM-DD HH:mm');
        //v.issueDate = moment(v.issueDate,'YYYY-MM-DD HH:mm');
        var flag = flagOfCoupon(v);
        var d1 = new Date(v.validityDate);
        var d2 = new Date(v.issueDate);
        v.validityDate = d1.getFullYear()+'.'+d1.getMonth()+'.'+d1.getDay();
        v.issueDate = d2.getFullYear()+'.'+d2.getMonth()+'.'+d2.getDay();
        v.flag = flag;
        v.site = site[flag];
        return v;
    })
    
    return coupons;
}

function flagOfCoupon(coupon) {
    var flag;
    if(coupon.employName === null){
        return "general";
    }
    if (coupon.employName.length > 1) {
        flag = "general";
    }
    if (coupon.employName.length === 1) {
        switch (coupon.employName[0]) {
            case "联盟优惠券":
                flag = "legue";
                break;
            case "特品汇":
                flag = "tepin";
                break;
            case "农博汇":
                flag = "hnmall";
                break;
            case "海外购":
                flag = "haitao";
                break;
            case "线下门店":
                flag = "shop";
                break;
        }
    }
    return flag;
}

 

var coupon = function(req, res, next) {

    var memberId = 'fc6804de4ffab221014ffd0ed2160001';
    

    //优惠券状态:0未生效,1已使用,2已过期,3可使用.
    //4已失效(已失效，包括已使用和已过期),5有效券(有效优惠券，包括可使用和未生效)
    //是否联盟 0：非联盟,1：联盟 
    bluebird.props({
        enableCoupons: couponByUser({
            memberId: memberId,
            isMerchants: 0,
            status: 0,
            pageSize: pageSize,
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
                legueCoupons:[],
                enableIndex:1,
                invalidIndex:0,
                legueIndex:0
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

var fetchCoupon = function(req, res, next){
    var memberId = 'fc6804de4ffab221014ffd0ed2160001';
    var isMerchants = req.body.isMerchants;
    var status = req.body.status;
    var pageIndex=req.body.pageIndex;
    var pageSize = 10;
 
    bluebird.props({
        coupons: couponByUser({
            memberId,
            isMerchants,
            status,
            pageSize,
            pageIndex
        })
    }).then(function(resp) {
        if(resp.coupons.returnCode===0){
            var coupons = formatCoupons(resp.coupons.object.result);
            res.json({
                isFetched: true,
                pageIndex:pageIndex,
                coupons
            })
        }
    });
}

module.exports = {
    coupon,
    fetchCoupon
}