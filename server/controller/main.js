'use strict'
var util = require("../lib/util");
var ErrorContent = util.getSharedComponent("common", "error.jsx");
var TestContent = util.getSharedComponent("test");
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
    var pageContent = util.readFromStaticCache(req)
    if(process.env.HMR_ENABLED){
       next() 
    }else{
        if(pageContent){
            console.log("return from static cache")
            res.send(pageContent)
        }else{
            next()
        }
    }
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

var test = function(req,res){
    var initialState ={
        msg:"test"
    }
    util.cleanStaticCache()
    req.session["localcart"] = null
    var markup = util.getMarkupByComponent(TestContent({
        initialState:initialState
    }))
    res.render("test",{
        markup:markup,
        initialState:initialState
    })
}

var checkVisitor = function(req,res,next){
    if(req.xhr===true){
        next();
    }
    var userAgent = req.headers['user-agent'].toLowerCase();
    var mobileAgent = ["iphone", "ipod", "ipad", "android", "mobile","windows phone","blackberry", "nokia"];
    var isMobile = false;
    var originalUrl = req.originalUrl;
    var url = 'http://www.tepin.hk';
    for (var i=0,n=mobileAgent.length; i<n; i++){ 
        if (userAgent.indexOf(mobileAgent[i])!==-1){ 
            isMobile = true;
        }
    }
    if(false===isMobile){
        if(process.env.NODE_ENV==='test'){
            url = 'http://www.hwg.youayun.cn';
        }
        if(originalUrl.indexOf('/shop/sp-') !== -1){
            url += originalUrl;
        }
        res.redirect(url);
    }else{
        next();
    }
}

module.exports = {
    authorizeLocals: authorizeLocals,
    requireAuthorize: requireAuthorize,
    staticize:staticize,
    notFoundHandler: notFoundHandler,
    errorHandler: errorHandler,
    test:test,
    checkVisitor:checkVisitor
};
