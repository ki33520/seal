'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var MembercenterApp = util.getSharedComponent("membercenter");

var memberCenter = function(req, res, next) {
    var config = req.app.locals.config;
    var loginUrl = res.locals.loginUrl;
    var registerUrl = res.locals.registerUrl;
    var logoutUrl = res.locals.logoutUrl;

    var authorized = req.session.user !== undefined;
    if (authorized === true) {
        var user = req.session.user;

        bluebird.props({
            memberDetailByUser: util.fetchAPI("memberDetailByUser", {
                memberId: user.memberId
            },true),
            memberCountOrder: util.fetchAPI("memberCountOrder", {
                memberId: user.memberId
            },true),
        }).then(function(ret) {
            if (ret.memberDetailByUser.code === "success") {
                var member = ret.memberDetailByUser.object;
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
                next(new Error(ret.msg));
            }
        });
    }else{
        bluebird.props({
            memberDetailByUser: util.fetchAPI("memberDetailByUser", {
                memberId: ''
            },true)
        }).then(function(ret) {
            if (ret.memberDetailByUser.code === "success") {
                var member = ret.memberDetailByUser.object;
                var initialState = {
                    isFetched: true,
                    isLogined: authorized,
                    member: member,
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
            }else{
                next(new Error(ret.msg));
            }
        });
    }
    
}

module.exports = memberCenter;