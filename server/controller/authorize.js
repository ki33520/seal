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
        if (resp.code === "success") {
            if (returnUrl === null) {
                location.replace("/usercenter");
            } else {
                returnUrl = decodeURIComponent(sharedUtil.base64DecodeForURL(returnUrl));
                req.session.user = resp.object;
                res.redirect(returnUrl);
            }
        } else {
            return next(new Error(resp.msg));
        }
    }, function(err) {
        console.log('err', err)
    });
}

var logoutGateway = function(req, res, next) {
    var returnUrl = req.query.returnUrl;
    if (returnUrl === null) {
        location.replace("/usercenter");
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
