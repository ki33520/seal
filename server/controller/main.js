'use strict'
var util = require("../lib/util");
var ErrorContent = util.getSharedComponent("common", "error.jsx");
var TestContent = util.getSharedComponent("test");
var config = require("../lib/config");
var fs = require("fs");
var path = require("path");
var md5 = require('md5');
var reqwest = require("reqwest");

var authorizeLocals = function(req, res, next) {
    var loginRedirectUrl = util.getAuthGatewayUrl(req, "/logingateway", true);
    var logoutRedirectUrl = util.getAuthGatewayUrl(req, "/logoutgateway", true);

    res.locals.loginUrl = config.loginUrl + "&redirectUrl=" + loginRedirectUrl;
    res.locals.registerUrl = config.registerUrl +"&redirectUrl=" + loginRedirectUrl;
    res.locals.logoutUrl = config.logoutUrl + "&redirectUrl=" + logoutRedirectUrl;
    next();
}

var requireAuthorize = function(req, res, next) {
    var loginRedirectUrl = util.getAuthGatewayUrl(req, "/logingateway", true);
    var guiderCode = req.cookies["tag"] ? req.cookies["tag"]:""
    var loginUrl = config.loginUrl + "&tag="+ guiderCode + "&redirectUrl=" + loginRedirectUrl;
    if (req.session.user !== undefined) {
        next();
    } else {
        res.redirect(loginUrl);
    }
}

var popularize = function(req,res,next){
    var code = ""
    code = req.query["source"] || req["hmsr"]
    res.cookie("popularizeCode",code)
    next()
}

var weixinConfig = function(req,res,next){
    var url = config.weixinConfig + "&url=" + encodeURIComponent(util.fullURLByReq(req))
    reqwest({url:url,method:"GET",type:"json"}).then(function(ret){
        var _wxConfig = null
        if(ret.returnCode === 0){
            _wxConfig = ret.data
            _wxConfig["debug"] = (process.env.NODE_ENV === "develop")
        }
        res.locals.weixinConfig = _wxConfig
        next()
    },function(){
        res.locals.weixinConfig = null
        next()
    })
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

    res.status(500)
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
    res.status(404)
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
    }else{
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
}

module.exports = {
    authorizeLocals: authorizeLocals,
    requireAuthorize: requireAuthorize,
    staticize:staticize,
    notFoundHandler: notFoundHandler,
    errorHandler: errorHandler,
    popularize:popularize,
    test:test,
    weixinConfig:weixinConfig,
    checkVisitor:checkVisitor
};
