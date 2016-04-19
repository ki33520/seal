'use strict'
var _ = require("lodash");
var api = require("./api.json");

api = _.extend(api,require("./api/index.json"));
api = _.extend(api,require("./api/order.json"));
api = _.extend(api,require("./api/user.json"));
api = _.extend(api,require("./api/cart.json"));

var config = {
    "urlPrefix":"/shop",
    // "apiServer" : "http://wsns.tepin.youayun.cn",
    "oathServer" : "https://ssl.e9448.com",
    "appKey" : "0236fe7659864b1b881cb6e94709de3f",
    "appId": "hwg",
    "imgServer":"http://imgtest.tepin.com/",
    "cacheServer":{
        "hosts":["memcached.hwg.youayun.cn:11211"]
    },
    "sharedQRCodePath":"http://product.hwg.youayun.cn",
    "cashier":"http://cashier.e9448.com"
};
var runtime = process.env["NODE_ENV"];
config["runtime"] = runtime;
if (runtime === "develop") {
    // config.apiServer = "http://wsns.tepin.youayun.cn";
    config.oathServer = "https://ssl.e9448.com";
    config.appKey = "b320de0549a24ff6995dc0e2c38ff491";
    config.appId = "haiwaigou";
    config.sharedQRCodePath = "http://product.hwg.youayun.cn:7989";
}
if(runtime === "test"){
    // config.apiServer = "http://wsns.tepin.youayun.cn";
    config.oathServer = "https://ssl.e9448.com";
    config.appKey = "0236fe7659864b1b881cb6e94709de3f";
    config.appId = "hwg";
}
if(runtime === "hotfix"){
    config.oathServer = "http://login.tepin.com";
    config.appKey = "35c33163124346fa9dabb7d8435a811d";
    config.appId = "haiwaigou";
    config.sharedQRCodePath = "http://product.tepin.hk"
    config.imgServer = "http://img.tepin.hk/"
    config.cashier = "http://cashier.tepin.com"
}
if(runtime === "production"){
    config.oathServer = "http://login.tepin.com";
    config.appKey = "35c33163124346fa9dabb7d8435a811d";
    config.appId = "haiwaigou";
    config.sharedQRCodePath = "http://product.tepin.hk"
    config.imgServer = "http://img.tepin.hk/"
    config.cashier = "http://cashier.tepin.com"
}
config.loginUrl = config.oathServer +
    "/score/member/"+config.appId+"/haiwaigou-wap/wap/login.html?responseType=code";
config.logoutUrl = config.oathServer +
    "/score/member/"+config.appId+"/haiwaigou-wap/wap/logout?responseType=code";
config.registerUrl = config.oathServer +
    "/score/member/"+config.appId+"/haiwaigou-wap/wap/register.html?responseType=code";

config.api = _.mapValues(api, function(v) {
    if(runtime === "develop"){
        v.url = v.baseURL["develop"]?v.baseURL["develop"] + v.uri:config.apiServer
    }else if(runtime === "test"){
        v.url = v.baseURL["test"]?v.baseURL["test"] + v.uri:config.apiServer
    }else if(runtime === "production"){
        v.url = v.baseURL["production"] + v.uri
    }else if(runtime === "hotfix"){
        v.url = v.baseURL["production"] + v.uri
    }
    // v.url = config.apiServer + v.uri;
    return v;
});
module.exports = config;