'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var MembercenterApp = util.getSharedComponent("membercenter");

var memberCenter = function(req, res, next) {
    var user = req.session.user;
    bluebird.props({
        newLogin: util.fetchAPI("newLogin", {
            accessCode: '/'
        },true)
    }).then(function(ret){
        var login = ret.newLogin.code === "success" ?  true : false;
        bluebird.props({
            memberCenterByUser: util.fetchAPI("memberCenterByUser", {
                memberId: ''
            },true)
        }).then(function(ret) {
            if (ret.memberCenterByUser.code === "success") {
                var member = ret.memberCenterByUser.object;
                var initialState = {
                    member: member,
                    login: login
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
    });
    
}

module.exports = memberCenter;