'use strict'
var util = require("../lib/util");
var ErrorContent = util.getSharedComponent("common", "error.jsx");
var config = require("../lib/config");
var fs = require("fs");
var path = require("path");
var md5 = require('md5');

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

var staticize = function(req,res,next){
    var pageContent = util.readPage(md5(req.originalUrl))
        // console.log('pageContent',pageContent)
    if(pageContent){
        res.send(pageContent)
    }else{
        next()
    }
    // console.log(fs.statSync(path.resolve("client/page/index.html")))
}

var errorHandler = function(err,req,res,next){
    // console.log(err.stack)
    var initialState = {
        code: "500",
        msg:"啊噢~您访问的页面连接出错咯..."
        // msg: err.message
    };
    var markup = util.getMarkupByComponent(ErrorContent({
        initialState: initialState
    }));

    res.render('error', {
        markup: markup,
        initialState: initialState
    });
}

var notFoundHandler = function(req, res) {
    var initialState = {
        code: "404",
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
    authorizeLocals: authorizeLocals,
    requireAuthorize: requireAuthorize,
    staticize:staticize,
    notFoundHandler: notFoundHandler,
    errorHandler: errorHandler
};
