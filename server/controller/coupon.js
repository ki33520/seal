'use strict';
var moment = require("moment");
var _ = require("lodash");
var bluebird = require("bluebird");
var util = require("../lib/util.js");
var CouponApp = util.getSharedComponent("coupon");
 
function formatCoupons(originalCoupons) {
    var coupons = [];
    originalCoupons.map((v,k)=>{
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
//是否联盟 0：非联盟,1：联盟 
var coupon = function(req, res, next) {
    var user = req.session.user;
    var pageSize = 10;
    var pageIndex = req.body.pageIndex || 1;
    var type = req.body.type||'youa';
    var options = {
        youa:{status:0,isMerchants:0},
        legue:{status:1,isMerchants:1},
        invalid:{status:3}
    };
    var param = _.merge(options[type],{
        memberId:user.memberId,
        pageSize:pageSize,
        pageIndex:pageIndex
    });
 
    bluebird.props({
        coupons: util.fetchAPI("couponByUser", param)
    }).then(function(resp) {
        //console.log(resp.coupons.object.result)
        if(resp.coupons.returnCode===0){
            var pagination = {
                youa:{
                    coupons:[],
                    pageIndex,
                    totalPage:0
                },
                legue:{
                    coupons:[],
                    pageIndex,
                    totalPage:0
                },
                invalid:{
                    coupons:[],
                    pageIndex,
                    totalPage:0
                }
            };

            var obj = resp.coupons.object;

            if (obj && obj.result) {
                pagination[type] = {
                    coupons:formatCoupons(obj.result),
                    pageIndex:pageIndex,
                    totalPage:Math.ceil(obj.totalCount / pageSize)
                }
            }

            var initialState = {
                pagination: pagination,
                couponType:['youa','legue','invalid'],
                isFetching: false
            };

            if (req.xhr === true) {
                res.json(initialState);
            }else{
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

module.exports = coupon;