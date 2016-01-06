'use strict'
var util = require("../lib/util");
var ErrorContent = util.getSharedComponent("common","error.jsx");
var WeatherApp = util.getSharedComponent("index");
var config = require("../lib/config");

var index = function(req,res,next) {
    util.fetchAPI("index",{
        channel:"Mobile"
    }).then(function(ret){
        if(ret.returnCode === 0){
            var initialState = {
                data:ret.object
            };
            var markup = util.getMarkupByComponent(WeatherApp({
                initialState:initialState
            }));
            res.render("index", {
                markup: markup,
                initialState:initialState
            });

        }else{
            next(new Error(ret.msg))
        }
    },function(){
        next(new Error("api request failed"))
    })
};

var authorizeLocals = function(req, res, next) {
    var loginRedirectUrl = util.getAuthGatewayUrl(req, "/logingateway", true);
    var logoutRedirectUrl = util.getAuthGatewayUrl(req, "/logoutgateway", true);

    res.locals.loginUrl = config.loginUrl + "&redirectUrl=" + loginRedirectUrl;
    res.locals.registerUrl = config.registerUrl + "&redirectUrl=" + loginRedirectUrl;
    res.locals.logoutUrl = config.logoutUrl + "&redirectUrl=" + logoutRedirectUrl;
    next();
}

var requireAuthorize = function(req, res, next) {
    var loginRedirectUrl = util.getAuthGatewayUrl(req, "/logingateway", true);
    var loginUrl = config.loginUrl + "&redirectUrl=" + loginRedirectUrl;
    if (req.session.user !== undefined) {
        next();
    } else {
        res.redirect(loginUrl);
    }
}

var errorHandler = function(err, req, res) {
    if (err) {
        var initialState = {
            code:"500",
            msg: err.message
        };
        var markup = util.getMarkupByComponent(ErrorContent({
            initialState: initialState
        }));

        res.render('error', {
            markup: markup,
            initialState: initialState
        });
    } else {
        res.end();
    }
}

var notFoundHandler = function(req, res) {
    var initialState = {
        code:"404",
        msg: "啊噢~您访问的页面不在地球上..."
    };
    var markup = util.getMarkupByComponent(ErrorContent({
        initialState: initialState
    }));

    res.render('error', {
        markup: markup,
        initialState: initialState
    });
}

module.exports = {
    index:index,
    authorizeLocals:authorizeLocals,
    requireAuthorize:requireAuthorize,
    notFoundHandler:notFoundHandler,
    errorHandler:errorHandler
};
