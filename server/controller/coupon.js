'use strict';
var moment = require("moment");
var _ = require("lodash");
var util = require("../lib/util.js");
var CouponApp = util.getSharedComponent("coupon");
function flagOfCoupon(employCode) {
    return {name:"海外购",value:"haitao",title:"海外购www.tepin.hk"};
}
function filterCoupon(obj){
    var coupon = {};
    if(obj){
        var rule = obj.ruleObject || {};
        coupon = {
            qrCode:null,//二维码obj.qrCode
            couponNo:obj.couponNo,//'优惠券号'
            couponName:rule.couponName,//'优惠券名'
            platform:flagOfCoupon(obj.employCode).name,//'使用平台'
            issueDate:obj.issueStartTime,//,'发券日期'
            useDate:obj.issueDate,//'生效日期'
            expDate:obj.validityDate,//'使用期限'
            remark:obj.remark//'使用说明'
        };
    }
    return coupon;
}

function formatCoupons(originalCoupons) {
    var coupons = [];
    _.each(originalCoupons,function(v){
        var validityDate = moment(new Date(v.validityDate)).format('YYYY.MM.DD');
        var issueDate = moment(new Date(v.issueDate)).format('YYYY.MM.DD');
        var ruleObject = v.ruleObject || {};
        coupons.push({
            expiryDate:issueDate+' - '+validityDate,
            couponNo:v.couponNo,
            money:v.money,
            used:v.status===1,
            expiried:v.status===2,
            isLegue:v.isMerchants===1,
            couponName:ruleObject.couponName,
            songAccount:ruleObject.songAccount,
            useRules:v.useRules,
            couponDesc:v.couponDesc,
            shortName:v.shortName,
            flag:flagOfCoupon(v.employCode).title,
            description:ruleObject.description
        });
    });
    return coupons;
}
 
//优惠券状态:0未生效,1已使用,2已过期,3可使用.4已失效(已失效，包括已使用和已过期),5有效券(有效优惠券，包括可使用和未生效)
//是否联盟 0：非联盟,1：联盟(如果查询全部传空) 
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
                    couponType:['youa','invalid']
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
    },function(){
        next(new Error('api request failed'));
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