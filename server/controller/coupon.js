'use strict';

//var moment = require("moment");
var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var CouponApp = util.getSharedComponent("coupon");
 

function couponByUser(param) {
    return util.fetchAPI("couponByUser", param);
}

function formatCoupons(originalCoupons) {
    let site={
            tepin:"特品汇www.tepin.com",
            hnmall:"农博汇www.hnmall.com",
            haitao:"海外购www.tepin.hk"
        };
    let coupons = originalCoupons.map((v,k)=>{
        //v.validityDate = moment(v.validityDate,'YYYY-MM-DD HH:mm');
        //v.issueDate = moment(v.issueDate,'YYYY-MM-DD HH:mm');
        let flag = flagOfCoupon(v);
        let d1 = new Date(v.validityDate);
        let d2 = new Date(v.issueDate);
        v.validityDate = d1.getFullYear()+'.'+(d1.getMonth()+1)+'.'+d1.getDay();
        v.issueDate = d2.getFullYear()+'.'+(d2.getMonth()+1)+'.'+d2.getDay();
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
    let user = req.session.user;
    let memberId = 'fc6804de51c482730151e8ec0a080023';
    //优惠券状态:0未使用(包含已生效、未生效)
    //3已失效(包括已使用和已过期)
    //是否联盟 0：非联盟,1：联盟 
    bluebird.props({
        coupons: couponByUser({
            memberId: memberId,
            isMerchants: 0,
            status: 5,
            pageSize: 10,
            pageIndex: 1
        })
    }).then(function(resp) {
        console.log(resp.coupons.object.result)
        if(resp.coupons.returnCode===0){
            let coupons = [];
            let result = resp.coupons.object.result;

            if (result && result.length) {
                coupons = formatCoupons(result);
            }

            let initialState = {
                youaCoupons: coupons,
                legueCoupons:[],
                invalidCoupons:[]
            };

            let markup = util.getMarkupByComponent(CouponApp({
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
    let user = req.session.user;
    let isMerchants = req.body.isMerchants;
    let status = req.body.status;
    let pageIndex=req.body.pageIndex;
    let pageSize = 10;
 
    bluebird.props({
        coupons: couponByUser({
            memberId:user.memberId,
            isMerchants,
            status,
            pageSize,
            pageIndex
        })
    }).then(function(resp) {
        if(resp.coupons.returnCode===0){
            let coupons = formatCoupons(resp.coupons.object.result);
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