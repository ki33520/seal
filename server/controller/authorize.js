'use strict';
var util = require("../lib/util");
var sharedUtil = require("../../shared/lib/util.es6");
var _ = require("lodash");
var config = require("../lib/config");

var loginGateway = function(req, res, next) {
    var code = req.query.code;
    var returnUrl = req.query.returnUrl;
    util.fetchAPI("loginByCode", {
        memberCode: code
    }).then(function(resp) {
        if (resp.returnCode === 0) {
            if (returnUrl === null) {
                location.replace("/membercenter");
            } else {
                returnUrl = decodeURIComponent(sharedUtil.base64DecodeForURL(returnUrl));
                var user = _.pick(resp.object,[
                    "nickName","userName","mobileNumber","openId","lastLoginTime","wxOpenId"
                ])
                user.memberId = resp.object.id
                req.session.user = user;
                if(config.runtime === "develop"){
                    returnUrl = returnUrl.replace(":3000",":5000")
                }
                res.redirect(returnUrl);
            }
        } else {
            return next(new Error(resp.msg));
        }
    }, function(err) {
        return next(new Error("api request failed"))
    });
}

var logoutGateway = function(req, res, next) {
    var returnUrl = req.query.returnUrl;
    if (returnUrl === null) {
        location.replace("/membercenter");
    } else {
        returnUrl = decodeURIComponent(sharedUtil.base64DecodeForURL(returnUrl));
        req.session.user = undefined;
        res.redirect(returnUrl);
    }
}

module.exports = {
    loginGateway: loginGateway,
    logoutGateway: logoutGateway
};
