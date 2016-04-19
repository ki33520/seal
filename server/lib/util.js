'use strict';
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var sharedUtil = require("../../shared/lib/util.es6");
var sharedJumpURL = require("../../shared/lib/jumpurl.es6");
var config = require("./config");
var url = require("url");
var _ = require("lodash");
var md5 = require("md5");
var moment = require("moment");
var reqwest = require("reqwest");
var fs = require("fs");
var path = require('path');
var bluebird = require("bluebird");
var memoryCache = require("memory-cache");
var crypto = require("crypto");

var FSStorage = require("./fs-storage");
var fsStorage = new FSStorage({
    path:"server/recovery/"
})
var staticStorage = new FSStorage({
    path:"client/page/",
    serialize:false,
    ext:".html",
    expire:60000 * 10
})

var urlPrefix = require("./config").urlPrefix

var util = {
    jumpURL:sharedJumpURL.jumpURL,
    cipher:function(data,algorithm,key){
        algorithm = algorithm || "rc4"
        key = key || "seal"
        var encrypted = "";
        var cip = crypto.createCipher(algorithm, key);
        encrypted += cip.update(data, 'utf8', 'base64');
        encrypted += cip.final('base64');
        return encrypted
    },
    decipher:function(encrypted,algorithm,key){
        algorithm = algorithm || "rc4"
        key = key || "seal"
        var decrypted = "";
        var decipher = crypto.createDecipher(algorithm, key);
        decrypted += decipher.update(encrypted, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted
    },
    base64EncodeForURL(str){
        var encodedStr = util.cipher(str)
        return encodedStr.replace(/=/g, "_").replace(/\//g, ",").replace(/\+/g, "-")
    },
    base64DecodeForURL(encodedStr){
        encodedStr = encodedStr.replace(/_/g, "=").replace(/,/g, "/").replace(/-/g, "+");
        return util.decipher(encodedStr)
    },
    getAuthGatewayUrl: function(req, authPath) {
        var returnUrl = {
            protocol: req.protocol,
            host: req.headers.host,
            pathname: req.url
        }
        var encodeReturnUrl = util
            .base64EncodeForURL(encodeURIComponent(url.format(returnUrl)));
        returnUrl.pathname = urlPrefix + authPath
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
        // console.log('runtime',config.runtime)
        // var cacheKey = md5(apiName + JSON.stringify(param))
        param = _.extend(param,{
            appId:config.appId,
            channel:"Mobile",
            terminalType:"H5",
            t:moment().format("X")
        })
        var signature = this.getSignatureByParam(param,config.appKey)
        param = _.extend(param,{h:signature})
        console.log("apiRequest",config.api[apiName].url +"?"+sharedUtil.urlParam(param))
        if (isMock === false) {
            return sharedUtil.apiRequest(config.api[apiName].url, param,options)
        } else {
            var listenPort = process.env.LISTEN_PORT || 3000;
            return sharedUtil.apiRequest("http://:"+ listenPort +"/mock/api/" + apiName)
        }
    },
    recoveryFromStorage(apiName,param){
        var cacheKey = md5(apiName + JSON.stringify(param))
        return fsStorage.get(cacheKey)
    },
    fetchCachedAPI:function(apiName,param,options){
        options = options || {}
        var isMock = options.isMock || false
        var maxAge = (options.maxAge * 1000 * 60) || 1000 * 60 *15
        // console.log('maxAge',maxAge)
        options = _.omit(options,["isMock","maxAge"])
        var cacheKey = md5(apiName + JSON.stringify(param))
        if(memoryCache.get(cacheKey) === null){
            // console.log(apiName,'need cached')
            return this.fetchAPI(apiName,param,isMock,options).then(function(res){
                if(res.returnCode === 0){
                    memoryCache.put(cacheKey,res,maxAge) //15 minutes
                    fsStorage.set(cacheKey,res)
                }
                return res
            })
        }else{
            return bluebird.resolve(memoryCache.get(cacheKey))
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
    saveSearchHistory(searchHistory,record){
        searchHistory = searchHistory || [];
        if(record.keyword == ""){
            return searchHistory
        }
        var index = _.findIndex(searchHistory,{"keyword":record.keyword})
        if(index === -1){
            searchHistory.push(record)
        }else if(index >=0){
            searchHistory[index] = record
        }
        return searchHistory
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
    writeToStaticCache(req,html){
        var urlObj = {
            protocol: req.protocol,
            host: req.headers.host,
            pathname: req.url,
            query:req.query
        }
        var key = md5(encodeURIComponent(url.format(urlObj)))
        staticStorage.set(key,html)
    },
    readFromStaticCache(req){
        var urlObj = {
            protocol: req.protocol,
            host: req.headers.host,
            pathname: req.url,
            query:req.query
        }
        var key = md5(encodeURIComponent(url.format(urlObj)))
        return staticStorage.get(key)
    },
    cleanStaticCache(){
        staticStorage.clean()
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
