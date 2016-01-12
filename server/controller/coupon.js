'use strict';

var moment = require("moment");
var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var CouponApp = util.getSharedComponent("coupon");
 

function couponByUser(param) {
    return util.fetchAPI("couponByUser", param);
}

function formatCoupons(originalCoupons) {
    
    let coupons = [];

    originalCoupons.map((v,k)=>{
        let code = v.employCode;
        if (code && code.length) {
            if(code.indexOf('haiwaigou')!== -1){
                let validityDate = moment(new Date(v.validityDate)).format('YYYY.MM.DD');
                let issueDate = moment(new Date(v.issueDate)).format('YYYY.MM.DD');
                 
                coupons.push({
                    expiryDate:issueDate+' - '+validityDate,
                    couponNo:v.couponNo,
                    money:v.money,
                    couponName:v.ruleObject.couponName,
                    songAccount:v.ruleObject.songAccount,
                    useRules:v.useRules,
                    couponDesc:v.couponDesc,
                    shortName:v.shortName,
                    description:v.ruleObject.description
                });
            }
        }
    })
    
    return coupons;
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
            status: 0,
            pageSize: 10,
            pageIndex: 1
        })
    }).then(function(resp) {
       // console.log(resp.coupons.object.result)
        if(resp.coupons.returnCode===0){
            let coupons = [];
            let obj = resp.coupons.object;

            if (obj && obj.result.length) {
                coupons = formatCoupons(obj.result);
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