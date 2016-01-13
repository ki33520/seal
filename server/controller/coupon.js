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
 
//优惠券状态:0未使用(包含已生效、未生效)
//3已失效(包括已使用和已过期)
//是否联盟 0：非联盟,1：联盟 
var coupon = function(req, res, next) {
    let user = req.session.user;
    let pageSize = 10;
    let pageIndex = req.body.pageIndex || 1;
    let type = req.body.type||'youa';
    let options = {
        youa:{status:0,isMerchants:0},
        legue:{status:1,isMerchants:1},
        invalid:{status:3}
    };
    let param = _.merge(options[type],{
        memberId:'fc6804de51c482730151e8ec0a080023',
        pageSize:pageSize,
        pageIndex:pageIndex
    });
 
    bluebird.props({
        coupons: couponByUser(param)
    }).then(function(resp) {
        //console.log(resp.coupons.object.result)
        if(resp.coupons.returnCode===0){
            let pagination = {
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

            let obj = resp.coupons.object;

            if (obj && obj.result) {
                pagination[type] = {
                    coupons:formatCoupons(obj.result),
                    pageIndex:pageIndex,
                    totalPage:Math.ceil(obj.totalCount / pageSize)
                }
            }

            let initialState = {
                pagination: pagination,
                couponType:['youa','legue','invalid'],
                isFetching: false
            };

            if (req.xhr === true) {
                res.json(initialState);
            }else{
                let markup = util.getMarkupByComponent(CouponApp({
                    initialState: initialState
                }));

                res.render('coupon', {
                    markup: markup,
                    initialState: initialState
                })
            }
        }   
        
    });

}

module.exports = coupon;