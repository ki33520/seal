'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var MemberupdatebasicApp = util.getSharedComponent("memberupdatebasic");
var sharedUtil = require("../../shared/lib/util.es6");

var index = function(req, res, next) {
    var user = req.session.user;
    bluebird.props({
        memberInfoByUser: util.fetchAPI("regiestOrLogin", {
            memberId: ""
        },true)
    }).then(function(ret) {
        if (ret.memberInfoByUser.code === "success") {
            var memberInfo = ret.memberInfoByUser.object;
            var initialState = {
                memberInfo: memberInfo
            };
            
            var markup = util.getMarkupByComponent(MemberupdatebasicApp({initialState:initialState}));
            
            res.render('memberupdatebasic', {
                markup: markup,
                initialState: initialState
            })
        }else{
            next(new Error(ret.msg));
        }
    });
    
}
var update = function(req, res, next) {
    var cityName = req.body.cityname;
    bluebird.props({
        saveMemberInfo: util.fetchAPI("saveMemberInfo", {
            memberId: ""
        },true)
    }).then(function(ret) {
        if(ret.errMsg === "success"){
            res.json({
                weatherFetched:true,
                result:ret.retData
            })
        }else{
            res.json({
                weatherFetched:false,
                errMsg:ret.errMsg
            })
        }
    });
}
module.exports = {
    index: index,
    update: update
};