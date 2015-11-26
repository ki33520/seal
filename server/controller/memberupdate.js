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
            next(new Error(ret.regiestOrLogin.msg));
        }
    });
}

var updateBasic = function(req, res, next) {
    var nickname = req.body.nickname;
    var gender = req.body.gender;
    var birthdy = req.body.birthdy;
    bluebird.props({
        updateBasicByUser: util.fetchAPI("updateBasicByUser", {
            memberId: "",
            nickname: nickname,
            gender: gender,
            birthdy: birthdy
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
                errMsg:ret.updateBasicByUser.msg
            })
        }
    });
}

var updatePassword = function(req, res, next) {
    var oldPassword = req.body.oldPassword;
    var password = req.body.password;
    var repeatPassword = req.body.repeatPassword;
    bluebird.props({
        updatePasswordByUser: util.fetchAPI("updatePasswordByUser", {
            memberId: "",
            oldPassword: oldPassword,
            password: password,
            repeatPassword: repeatPassword
        },true)
    }).then(function(ret) {
        if (ret.updatePasswordByUser.code === "success") {
            res.json({
                isChanged: true
            })
        }else{
            res.json({
                isChanged:false,
                errMsg:ret.updatePasswordByUser.msg
            })
        }
    });
}

var updateMembercard = function(req, res, next) {
    var config = req.app.locals.config;
    var cardNo = req.body.cardNo;
    var mobileNumber = req.body.mobileNumber;
    var verifyCode = req.body.verifyCode;
    var user = req.session.user;

    bluebird.props({
        updateMembercardByUser: util.fetchAPI("updateMembercardByUser", {
            memberId: "",
            cardNo: cardNo,
            mobileNumber: mobileNumber,
            verifyCode: verifyCode
        },true)
    }).then(function(ret) {
        if (ret.updateMembercardByUser.code === "success") {
            res.json({
                isChanged: true
            })
        }else{
            res.json({
                isChanged:false,
                errMsg:ret.updateMembercardByUser.msg
            })
        }
    });
}

var updateMemberCardVerifyCode = function(req, res, next) {
    var config = req.app.locals.config;
    var mobileNumber = req.body.mobileNumber;
    var user = req.session.user;

    bluebird.props({
        updateMemberCardVerifyCode: util.fetchAPI("updateMemberCardVerifyCode", {
            memberId: "",
            mobileNumber: mobileNumber
        },true)
    }).then(function(ret) {
        if (ret.updateMemberCardVerifyCode.code === "success") {
            res.json({
                isSend: true
            })
        }else{
            res.json({
                isSend:false,
                errMsg:ret.updateMemberCardVerifyCode.msg
            })
        }
    });
}

module.exports = {
    update: update,
    updateBasic: updateBasic,
    updatePassword: updatePassword,
    updateMembercard: updateMembercard,
    updateMemberCardVerifyCode: updateMemberCardVerifyCode
};