'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var MembercenterApp = util.getSharedComponent("membercenter");
var config = require("../lib/config");

var filterMemberInfo = function(result){
    var object = new Object();
    object = {
        email: result.email,
        nickName: result.nickName,
        userName: result.userName,
        mobileNumber: result.mobileNumber,
        lastLoginTime: result.lastLoginTime,
        gender: result.gender,
        birthday: result.birthday,
        imageUrl: result.imageUrl,
        registerTime: result.registerTime,
        promoterQr: result.promoterQr
    };
    return object;
}
var filterCountOrder = function(result){
    var object = new Object();
    object = {
        paymentNum: result.paymentNum,
        sendNum: result.sendNum,
        signNum: result.signNum,
        commentNum: result.commentNum
    };
    return object;
}

var memberCenter = function(req, res, next) {
    var loginUrl = res.locals.loginUrl;
    var registerUrl = res.locals.registerUrl;
    var logoutUrl = res.locals.logoutUrl;
    var authorized = req.session.user !== undefined;

    if (authorized === true) {
        var user = req.session.user;
        bluebird.props({
            memberMemberInfo: util.fetchAPI("memberDetailByUser", {
                memberId: user.memberId
            },false),
            memberCountOrder: util.fetchAPI("memberCountOrder", {
                memberId: user.memberId
            },false),
            promoterQr: util.fetchAPI("promoterQr", {
                memberId: user.memberId
            },false)
        }).then(function(resp) {
            if (resp.memberMemberInfo.returnCode === 0 && resp.memberCountOrder.returnCode === 0) {
                var member = filterMemberInfo(resp.memberMemberInfo.object);
                member.promoterQr = resp.promoterQr.object;
                var countOrder = filterCountOrder(resp.memberCountOrder.object);

                var initialState = {
                    isFetched: true,
                    isLogined: authorized,
                    member: member,
                    countOrder: countOrder,
                    api: {
                        logoutUrl: logoutUrl
                    }
                };
                
                var markup = util.getMarkupByComponent(MembercenterApp({initialState:initialState}));

                res.render('membercenter', {
                    markup: markup,
                    initialState: initialState
                })
            }else{
                if(resp.memberMemberInfo.returnCode !== 0){
                    next(new Error(resp.memberMemberInfo.message));
                }
                if(resp.memberCountOrder.returnCode !== 0){
                    next(new Error(resp.memberCountOrder.message));
                }
            }
        }).error(function() {
            next(new Error('api request failed'));
        });
    }else{
        var initialState = {
            isFetched: true,
            isLogined: authorized,
            api: {
                loginUrl: loginUrl,
                registerUrl: registerUrl
            }
        };
        
        var markup = util.getMarkupByComponent(MembercenterApp({initialState:initialState}));

        res.render('membercenter', {
            markup: markup,
            initialState: initialState
        })
    }
    
}

module.exports = memberCenter;