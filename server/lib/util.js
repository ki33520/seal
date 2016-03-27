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
var fs = require("fs");
var path = require('path');

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
    fetchAPI: function(apiName, param, isMock,options) {
        isMock = isMock || false;
        console.log('runtime',config.runtime)
        param = _.extend(param,{
            appId:config.appId,
            channel:"Mobile",
            terminalType:"H5",
            t:moment().format("X")
        })
        var signature = this.getSignatureByParam(param,config.appKey)
        // console.log('signature',signature)
        param = _.extend(param,{h:signature})
        console.log("param",config.api[apiName].url +"?"+sharedUtil.urlParam(param))
        if (isMock === false) {
            return sharedUtil.apiRequest(config.api[apiName].url, param,options)
        } else {
            var listenPort = process.env.LISTEN_PORT || 3000;
            return sharedUtil.apiRequest("http://:"+ listenPort +"/mock/api/" + apiName)
        }
    },
    getAPI(apiName,param){
        param = _.extend(param,{
            appId:config.appId,
            channel:"Mobile",
            terminalType:"H5",
            t:moment().format("X")
        })
        var signature = this.getSignatureByParam(param,config.appKey);
        param = _.extend(param,{h:signature})
        return config.api[apiName].url +"?"+sharedUtil.urlParam(param)
    },
    getAPIURL(apiName,param){
        return config.api[apiName].url +"?"+sharedUtil.urlParam(param)
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
         // console.log("paramList",paramList)
        paramList = paramList.join("&")
        return md5(paramList)
    },
    decodeURLParam(param){
        param = sharedUtil.base64DecodeForURL(param)
        var _param = {}
        _.each(param.split("&"),function(v){
            v = v.split("=")
            var _v = {}
            _v[v[0]] = v[1]
            _.extend(_param,_v)
        })
        return _param
    },
    getLocalCartCount(carts){
        carts = carts || [];
        var cartCount = 0;
        _.each(carts,function(cart){
            cartCount += cart.buyed
        })
        return cartCount
    },
    isLocalCartLimitExceed(carts,cart,replace){
        let buyed = parseInt(cart.buyed,10)
        carts = carts || [];
        let isExceed = false
        if(_.some(carts,{singleCode:cart.singleCode})){
            _.each(carts,function(v){
                if(v.singleCode === cart.singleCode){
                    buyed = replace?buyed:(v.buyed + buyed)
                    isExceed = buyed > v.buyLimit
                }
            })
        }
        return isExceed
    },
    saveLocalCart(carts,cart,replace){
        let buyed = parseInt(cart.buyed,10)
        carts = carts || [];
        if(_.some(carts,{singleCode:cart.singleCode})){
            carts = _.map(carts,function(v){
                if(v.singleCode === cart.singleCode){
                    v.buyed = replace?buyed:(v.buyed + buyed)
                }
                return v
            })
        }else{
            carts.push({
                singleCode:cart.singleCode,
                buyed:buyed,
                buyLimit:cart.buyLimit
            })
        }
        return carts
    },
    saveSearchHistory(history,record){
        history = history || [];
        var index = _.findIndex(history,{"keyword":record.keyword})
        if(index === -1){
            history.push(record)
        }else if(index >=0){
            // history[index] = record
        }
        return history
    },
    syncLocalCart(memberId,carts){
        carts = carts || []
        var singleCodes = [],buyeds = [];
        _.each(carts,function(cart){
            singleCodes.push(cart.singleCode)
            buyeds.push(cart.buyed)
        })
        return this.fetchAPI("batchUpdateCart",{
            memberId:memberId,
            singleCodes:singleCodes.join(","),
            qtys:buyeds.join(",")
        })
    },
    writePage(pageName,html){
        var pagePath = path.resolve("client/page/"+pageName+".html")
        try{
            fs.statSync(path.resolve("client/page"))
        }catch(e){
            fs.mkdirSync(path.resolve("client/page"))
        }
        // console.log('writePage',fs.mkdirSync(path.resolve("client/page")))
        fs.writeFileSync(pagePath,html)
    },
    readPage(pageName){
        var pagePath = path.resolve("client/page/"+pageName+".html")
        var stat;
        try{
            stat = fs.statSync(pagePath)
        }catch(e){
            return false
        }
        if(stat.isFile()){
            var expire = (60000 * 10)
            if((Date.now() - stat.atime.getTime()) > expire){
                console.log('deprecate',Date.now() - stat.atime.getTime())
                return false
            }
            // console.log('stat',stat.atime.getTime(),Date.now())
            var pageContent = fs.readFileSync(pagePath,"utf8")
            return pageContent
        }
        return false
    }
}

module.exports = util;
