'use strict';

var _ = require("lodash");
var util = require("../lib/util");
var bluebird = require("bluebird");
var MemberupdateApp = util.getSharedComponent("memberupdate");

var update = function(req, res, next) {
    var user = req.session.user;
    bluebird.props({
        regiestOrLogin: util.fetchAPI("regiestOrLogin", {
            memberId: ""
        },true)
    }).then(function(ret) {
        if (ret.regiestOrLogin.code === "success") {
            var memberInfo = ret.regiestOrLogin.object;
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

var updateBasic = function(req, res, next) {
    var nickname = req.body.nickname;
    bluebird.props({
        updateBasicByUser: util.fetchAPI("updateBasicByUser", {
            memberId: "",
            nickname: nickname
        },true)
    }).then(function(ret) {
        if (ret.updateBasicByUser.code === "success") {
            var basicInfo = ret.updateBasicByUser.object;
            res.json({
                isChanged: true,
                result:basicInfo
            })
        }else{
            res.json({
                isChanged:false,
                errMsg:ret.msg
            })
        }
    });
}

module.exports = {
    update: update,
    updateBasic: updateBasic
};