'use strict';

var util = require("../lib/util");
var bluebird = require("bluebird");
var MemberupdateApp = util.getSharedComponent("memberupdate");

var update = function(req, res, next) {
    var user = req.session.user;
    bluebird.props({
        memberDetailByUser: util.fetchAPI("memberDetailByUser", {
            memberId: user.memberId
        },false)
    }).then(function(ret) {
        if (ret.memberDetailByUser.returnCode === 0) {
            var memberInfo = ret.memberDetailByUser.object;
            var initialState = {
                isFetched: true,
                memberInfo: memberInfo
            };
            var markup = util.getMarkupByComponent(MemberupdateApp({initialState:initialState}));
            res.render('memberupdate', {
                markup: markup,
                initialState: initialState
            })
        }else{
            next(new Error(ret.memberDetailByUser.message));
        }
    });
}

var updateBasic = function(req, res, next) {
    var user = req.session.user;
    var nickName = req.body.nickName;
    var gender = req.body.gender;
    var birthday = req.body.birthday;
    var fetchObj = {
        memberId: user.memberId,
        nickName: nickName,
        gender: gender
    };
    if(birthday){
        fetchObj.birthday = birthday;
    }
    bluebird.props({
        updateBasicByUser: util.fetchAPI("updateBasicByUser",fetchObj,false)
    },false,{ method: 'POST'}).then(function(ret) {
        if (ret.updateBasicByUser.returnCode === 0) {
            var basicInfo = ret.updateBasicByUser.object;
            res.json({
                isChanged: true,
                msg:ret.updateBasicByUser.message
            })
        }else{
            res.json({
                isChanged:false,
                msg:ret.updateBasicByUser.message
            })
        }
    });
}

var updatePassword = function(req, res, next) {
    var user = req.session.user;
    var oldPassword = req.body.oldPassword;
    var password = req.body.password;
    var repeatPassword = req.body.repeatPassword;
    bluebird.props({
        updatePasswordByUser: util.fetchAPI("updatePasswordByUser", {
            memberId: user.memberId,
            opassword: oldPassword,
            password: password,
            rpassword: repeatPassword
        },false)
    }).then(function(ret) {
        var msg = ret.updatePasswordByUser.message;
        if(msg === "账号密码错误"){
            msg = "旧密码错误，请重新输入！";
        }
        if(msg === "成功"){
            msg = "修改成功";
        }
        if (ret.updatePasswordByUser.returnCode === 0) {
            res.json({
                isChanged: true,
                msg: msg
            })
        }else{
            res.json({
                isChanged:false,
                msg: msg
            })
        }
    });
}

var updateMembercard = function(req, res, next) {
    var user = req.session.user;
    var cardNo = req.body.cardNo;
    var mobileNumber = req.body.mobileNumber;
    var verifyCode = req.body.verifyCode;

    bluebird.props({
        updateMembercardByUser: util.fetchAPI("updateMembercardByUser", {
            memberId: user.memberId,
            cardNo: cardNo,
            mobileNumber: mobileNumber,
            verifyCode: verifyCode
        },true)
    }).then(function(ret) {
        if (ret.updateMembercardByUser.returnCode === 0) {
            res.json({
                isChanged: true,
                msg:ret.updateMembercardByUser.message
            })
        }else{
            res.json({
                isChanged:false,
                msg:ret.updateMembercardByUser.message
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
        if (ret.updateMemberCardVerifyCode.returnCode === 0) {
            res.json({
                isSend: true,
                msg:ret.updateMemberCardVerifyCode.message
            })
        }else{
            res.json({
                isSend:false,
                msg:ret.updateMemberCardVerifyCode.message
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