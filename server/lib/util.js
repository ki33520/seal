'use strict';
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var sharedUtil = require("../../shared/lib/util.es6");
var config = require("./config");
var bluebird = require("bluebird");
var path = require("path");
var readFile = bluebird.promisify(require("fs").readFile);

var util = {
    getAuthGatewayUrl: function(req, authPath, needBack) {
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
    getSharedComponent:function(componentName,entryFile){
        entryFile = entryFile ||  "app.jsx";
        return React.createFactory(require("../../shared/chunk/" + componentName + "/" + entryFile));
    },
    getMarkupByComponent:function(component){
        return ReactDOMServer.renderToString(component);
    },
    fetchAPI:function(apiName,param,isMock){
        isMock = isMock || false;
        if(isMock === false){
            return sharedUtil.apiRequest(config.api[apiName].url,param)
        }else{
            var mockPath = path.join(__dirname,"../__mockapi__/")
            return readFile(mockPath + apiName + ".json","utf8").then(function(ret){
                return JSON.parse(ret);
            });
        }
    }
}

module.exports = util;
