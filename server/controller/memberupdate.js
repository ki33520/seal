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

var basic = function(req, res, next) {
    var cityName = req.body.cityname;
    var nickName = req.body.nickName;
    var gender = req.body.gender;
    var birthdy = req.body.birthdy;
    bluebird.props({
        updateBasicByUser: util.fetchAPI("updateBasicByUser", {
            memberId: "",
            nickName: nickName,
            gender: gender,
            birthdy: birthdy
        },true)
    }).then(function(ret) {
        if (ret.updateBasicByUser.code === "success") {
            var basicInfo = ret.updateBasicByUser.object;
            res.json({
                basicFetched:true,
                result:basicInfo
            })
        }else{
            res.json({
                basicFetched:false,
                errMsg:ret.msg
            })
        }
    });
}

module.exports = {
    update: update,
    basic: basic
};