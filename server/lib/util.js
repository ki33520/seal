'use strict';
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var sharedUtil = require("../../shared/lib/util.es6");
var config = require("./config");
var url = require("url");
var _ = require("lodash");
var md5 = require("md5");
var moment = require("moment");
var reqwest = require("reqwest");

var util = {
    getAuthGatewayUrl: function(req, authPath) {
        var returnUrl = {
            protocol: req.protocol,
            host: req.headers.host,
            pathname: req.url
        }
        var encodeReturnUrl = sharedUtil
            .base64EncodeForURL(encodeURIComponent(url.format(returnUrl)));

        returnUrl.pathname = authPath
        var authRedirectUrl = url.format(returnUrl);
        authRedirectUrl = encodeURIComponent(authRedirectUrl + "?returnUrl=" + encodeReturnUrl);
        return authRedirectUrl;
    },
    getSharedComponent: function(componentName, entryFile) {
        entryFile = entryFile || "app.jsx";
        return React.createFactory(require("../../shared/chunk/" + componentName + "/" + entryFile));
    },
    getMarkupByComponent: function(component) {
        return ReactDOMServer.renderToString(component);
    },
    fetchAPI: function(apiName, param, isMock) {
        isMock = isMock || false;
        param = _.extend(param,{
            appId:"haiwaigou",
            channel:"Mobile",
            terminalType:"H5",
            t:moment().format("X")
        })
        var signature = this.getSignatureByParam(param,"b320de0549a24ff6995dc0e2c38ff491")
        // console.log('signature',signature)
        param = _.extend(param,{h:signature})
        if (isMock === false) {
            console.log(config.api[apiName].url,param)
            return sharedUtil.apiRequest(config.api[apiName].url, param)
        } else {
            var listenPort = process.env.LISTEN_PORT || 3000;
            return sharedUtil.apiRequest("http://:"+ listenPort +"/mock/api/" + apiName)
        }
    },
    getSignatureByParam(param,salt){
        var keys = _.keys(param);
        var sortedKeys = _.sortBy(keys,function(key){ 
            return key
        })
        var paramList = [];
        _.each(sortedKeys,function(key){
            if(param[key] !== ""){
                paramList.push(key + "=" + param[key])
            }
        })
        paramList.push("appKey=" + salt)
         //console.log("paramList",paramList)
        paramList = paramList.join("&")
        return md5(paramList)
    }
}

module.exports = util;
