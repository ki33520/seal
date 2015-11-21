'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var MemberupdateApp = util.getSharedComponent("memberupdate");

var memberUpdate = function(req, res, next) {
    var user = req.session.user;
    bluebird.props({
        memberInfoByUser: util.fetchAPI("memberInfoByUser", {
            memberId: ""
        },true)
    }).then(function(ret) {
        if (ret.memberInfoByUser.code === "success") {
            var memberInfo = ret.memberInfoByUser.object;
            var initialState = {
                memberInfo: memberInfo
            };
            
            var markup = util.getMarkupByComponent(MemberupdateApp({initialState:initialState}));
            
            res.render('memberupdate', {
                markup: markup,
                initialState: initialState
            })
        }else{
            next(new Error(ret.msg));
        }
    });
    
}

module.exports = memberUpdate;