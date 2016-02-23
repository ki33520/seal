'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var MembercenterApp = util.getSharedComponent("membercenter");
var config = require("../lib/config");

var memberCenter = function(req, res, next) {
    var loginUrl = res.locals.loginUrl;
    var registerUrl = res.locals.registerUrl;
    var logoutUrl = res.locals.logoutUrl;
    // req.session.user = undefined
    var authorized = req.session.user !== undefined;

    if (authorized === true) {
        var user = req.session.user;
        bluebird.props({
            memberMemberInfo: util.fetchAPI("memberDetailByUser", {
                memberId: user.memberId
            },false),
            memberCountOrder: util.fetchAPI("memberCountOrder", {
                memberId: user.memberId
            },false)
        }).then(function(ret) {
            if (ret.memberMemberInfo.returnCode === 0 && ret.memberCountOrder.returnCode === 0) {
                var member = ret.memberMemberInfo.object;
                member.cardImgUrl = util.getAPI("memberCardQRCode", { openId: user.openId});
                var countOrder = ret.memberCountOrder.object;
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
                if(ret.memberMemberInfo.returnCode !== 0){
                    next(new Error(ret.memberMemberInfo.message));
                }
                if(ret.memberCountOrder.returnCode !== 0){
                    next(new Error(ret.memberCountOrder.message));
                }
            }
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