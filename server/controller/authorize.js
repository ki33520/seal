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
                location.replace(config.urlPrefix+"/membercenter.html");
            } else {
                returnUrl = decodeURIComponent(util.base64DecodeForURL(returnUrl));
                var user = _.pick(resp.object, [
                    "nickName", "userName", "mobileNumber", "openId", "lastLoginTime", "wxOpenId"
                ])
                user.memberId = resp.object.id
                req.session.user = user;
                // console.log('user',req.session["user"])
                if (returnUrl.search(/:3000/g) && config.runtime === "hotfix") {
                    returnUrl = returnUrl.replace(":3000",":5000")
                }
                if(req.session["localcart"] && req.session["localcart"].length > 0){
                    util.syncLocalCart(user.memberId, req.session["localcart"]).then(function(ret) {
                        if (ret.returnCode === 0) {
                            req.session["localcart"] = []
                            console.log('syncLocalCart success')
                            res.redirect(returnUrl);
                        } else {
                            console.log('syncLocalCart fail')
                            res.redirect(returnUrl);
                        }
                    }, function() {
                        console.log('syncLocalCart fail')
                        res.redirect(returnUrl);
                    })
                }else{
                    res.redirect(returnUrl);
                }
            }
        } else {
            return next(new Error(resp.message));
        }
    }, function(err) {
        return next(new Error("api request failed"))
    });
}

var logoutGateway = function(req, res, next) {
    var returnUrl = req.query.returnUrl;
    if (returnUrl === null) {
        location.replace(config.urlPrefix+"/membercenter.html");
    } else {
        req.session.user = undefined;
        returnUrl = decodeURIComponent(util.base64DecodeForURL(returnUrl));
        if (returnUrl.search(/:3000/g) && config.runtime === "hotfix") {
            returnUrl = returnUrl.replace(":3000",":5000")
        }
        res.redirect(returnUrl);
    }
}

module.exports = {
    loginGateway: loginGateway,
    logoutGateway: logoutGateway
};
