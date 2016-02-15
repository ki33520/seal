'use strict';
var moment = require("moment");
var _ = require("lodash");
var util = require("../lib/util.js");
var CouponApp = util.getSharedComponent("coupon");
function filterCoupon(obj){
    var coupon = {};
    if(obj){
        coupon = {
            qrCode:null,//二维码
            couponNo:obj.couponNo,//'优惠券号'
            couponName:obj.couponName,//'优惠券名'
            platform:obj.employCode,//'使用平台'
            issueDate:obj.issueStartTime,//,'发券日期'
            useDate:obj.issueDate,//'生效日期'
            expDate:obj.validityDate,//'使用期限'
            remark:obj.remark//'使用说明'
        };
        if(obj.employCode && obj.employCode !=='haiwaigou'){
            //coupon.qrCode = 'xxx'
        }
    }
    return coupon;
}

function formatCoupons(originalCoupons) {
    var coupons = [];
    _.each(originalCoupons,function(v){
        var code = v.employCode;
        if (code && code.length) {
            if(code.indexOf('haiwaigou')!== -1){
                var validityDate = moment(new Date(v.validityDate)).format('YYYY.MM.DD');
                var issueDate = moment(new Date(v.issueDate)).format('YYYY.MM.DD');
                var ruleObject = v.ruleObject || {};
                coupons.push({
                    expiryDate:issueDate+' - '+validityDate,
                    couponNo:v.couponNo,
                    money:v.money,
                    couponName:ruleObject.couponName,
                    songAccount:ruleObject.songAccount,
                    useRules:v.useRules,
                    couponDesc:v.couponDesc,
                    shortName:v.shortName,
                    description:ruleObject.description
                });
            }
        }
    })
    
    return coupons;
}
 
//优惠券状态:0未使用(包含已生效、未生效)
//3已失效(包括已使用和已过期)
//是否联盟 0：非联盟,1：联盟 , 不填则表示全部
var coupon = function(req, res, next) {
    var user = req.session.user;
    var pageSize = 10;
    var pageIndex = req.query.pageIndex || 1;
    var type = req.query.type||'youa';
    var options = {
        youa:{status:0,isMerchants:0},
        legue:{status:0,isMerchants:1},
        invalid:{status:3}
    };
    var param = _.merge(options[type],{
        memberId:user.memberId,
        pageSize:pageSize,
        pageIndex:pageIndex
    });
 
    util.fetchAPI("couponByUser", param).then(function(resp) {
        //console.log(resp.object.result)
        if(resp.returnCode===0){
            var pagination = {
                youa:{},
                legue:{},
                invalid:{}
            };
            var obj = resp.object;
            pagination[type] = {
                coupons:formatCoupons(obj.result),
                pageIndex:pageIndex,
                totalPage:Math.ceil(obj.totalCount / pageSize)
            };
            if (req.xhr === true) {
                res.json(pagination[type]);
            }else{
                var initialState = {
                    pagination: pagination,
                    couponType:['youa','legue','invalid']
                };
                var markup = util.getMarkupByComponent(CouponApp({
                    initialState: initialState
                }));

                res.render('coupon', {
                    markup: markup,
                    initialState: initialState
                })
            }
        }else{
            next(new Error(resp.message));
        }
    });
}

var couponDetail = function(req, res, next) {
    var user = req.session.user;
    var couponNo = req.params.id;

    util.fetchAPI("couponDetail", {
        memberId:user.memberId,
        couponNo: couponNo
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            res.json(filterCoupon(resp.object));
        }else{
            next(new Error(resp.message));
        }
    })
}

module.exports = {
    list:coupon,
    detail:couponDetail
};