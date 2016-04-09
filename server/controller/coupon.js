'use strict';
var moment = require("moment");
var _ = require("lodash");
var util = require("../lib/util.js");
var CouponApp = util.getSharedComponent("coupon");


function formatCoupons(originalCoupons) {
    var coupons = [];
    _.forEach(originalCoupons,function(v){
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
            flag:"海外购www.tepin.hk",
            description:ruleObject.description
        });
    });
    return coupons;
}
 
//优惠券状态:0未生效,1已使用,2已过期,3可使用.4已失效(已失效，包括已使用和已过期),5有效券(有效优惠券，包括可使用和未生效)
//是否联盟 0：非联盟,1：联盟(如果查询全部传空) 
var couponList = function(req, res, next) {
    var user = req.session.user;
    var pageSize = 10;
    var pageIndex = Number(req.query.pageIndex) || 1;
    var index = Number(req.query.index)||0;
    var coupons = [
        {title:'未使用优惠券',options:{status:0,isMerchants:0},list:[]},
        {title:'已失效优惠券',options:{status:3},list:[]}
    ];
    var param = _.merge(coupons[index].options,{
        memberId:user.memberId,
        pageSize:pageSize,
        pageIndex:pageIndex
    });
 
    util.fetchAPI("couponByUser", param).then(function(resp) {
        if(resp.returnCode===0){
            var obj = resp.object;
            var list = formatCoupons(obj.result);
            var totalPage=Math.ceil(obj.totalCount / pageSize);
            if (req.xhr === true) {
                res.json({
                    list:list,
                    pageIndex:pageIndex,
                    totalPage:totalPage,
                    isFetched:true
                });
            }else{
                coupons[index].list = list;
                coupons[index].pageIndex=pageIndex;
                coupons[index].totalPage=totalPage;
                var initialState = {
                    coupons: coupons,
                    isFetched:true
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
            if (req.xhr === true) {
                res.json({
                    list:null,
                    isFetched:false
                });
            }else{
                next(new Error(resp.message)); 
            }
        }
    },function(){
        next(new Error('api request failed'));
    });
}

module.exports = {
    list:couponList
};