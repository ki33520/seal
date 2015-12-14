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
        console.log(config.api.memberCenterByUser.url)
        bluebird.props({
            memberCenterByUser: util.fetchAPI("memberCenterByUser", {
                memberId: user.memberId
            },false)
        }).then(function(ret) {
            if (ret.memberCenterByUser.code === "success") {
                var member = ret.memberCenterByUser.object;
                var initialState = {
                    isFetched: true,
                    isLogined: authorized,
                    member: member,
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
            memberCenterByUser: util.fetchAPI("memberCenterByUser", {
                memberId: ''
            },true)
        }).then(function(ret) {
            if (ret.memberCenterByUser.code === "success") {
                var member = ret.memberCenterByUser.object;
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