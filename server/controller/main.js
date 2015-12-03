'use strict'
var util = require("../lib/util");
var ErrorContent = util.getSharedComponent("common","error.jsx");
var WeatherApp = util.getSharedComponent("index");
var sharedUtil = require("../../shared/lib/util.es6");
var config = require("../lib/config");

var weather = function(req,res){
    var cityName = req.body.cityname;
    if(req.xhr === true){
        sharedUtil.apiRequest("http://apistore.baidu.com/microservice/weather",{
            cityname:cityName
        }).then(function(ret){
            if(ret.errMsg === "success"){
                res.json({
                    weatherFetched:true,
                    result:ret.retData
                })
            }else{
                res.json({
                    weatherFetched:false,
                    errMsg:ret.errMsg
                })
            }
        })
    }
}

var index = function(req,res,next) {
    sharedUtil.apiRequest("http://apistore.baidu.com/microservice/weather",{
        cityname:"长沙"
    }).then(function(ret){
        if(ret.errMsg === "success"){
            var initialState = {
                weather:ret.retData
            };
            var markup = util.getMarkupByComponent(WeatherApp({
                initialState:initialState
            }));
            res.render("index", {
                markup: markup,
                initialState:initialState
            });

        }else{
            next(new Error(ret.errMsg))
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
        msg: "page not found13"
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
    weather:weather,
    authorizeLocals:authorizeLocals,
    requireAuthorize:requireAuthorize,
    notFoundHandler:notFoundHandler,
    errorHandler:errorHandler
};
