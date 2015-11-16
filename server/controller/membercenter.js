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
            memberInfo: util.fetchAPI("memberInfo", {
                memberId: ''
            },true)
        }).then(function(ret) {
            if (ret.memberInfo.code === "success") {
                var member = ret.memberInfo.object;

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