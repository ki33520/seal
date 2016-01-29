'use strict'
var _ = require("lodash");
var api = require("./api.json");

api = _.extend(api,require("./api/index.json"));
api = _.extend(api,require("./api/order.json"));
api = _.extend(api,require("./api/user.json"));
api = _.extend(api,require("./api/cart.json"));

var config = {
    "apiServer": "http://spi.tepin.com/mserver",
    "oathServer": "https://ssl.e9448.com",
    "imgServer":"http://imgtest.tepin.com/",
    "cacheServer":{
        "hosts":["memcached.hwg.youayun.cn:11211"]
    }
};
var runtime = process.env["NODE_ENV"];
// runtime = "test"
config["runtime"] = runtime;
if (runtime === "develop") {
    config.apiServer = "http://wsns.tepin.youayun.cn";
    config.oathServer = "https://ssl.e9448.com";
    config.appKey = "b320de0549a24ff6995dc0e2c38ff491";
    config.appId = "haiwaigou";
}
if(runtime === "test"){
    config.apiServer = "http://wsns.tepin.youayun.cn";
    config.oathServer = "https://ssl.e9448.com";
    config.appKey = "0236fe7659864b1b881cb6e94709de3f";
    config.appId = "hwg";
}
config.loginUrl = config.oathServer +
    "/score/member/v1/authorize?skin=haiwaigou-wap&clientId="+config.appId+"&channel=wap&responseType=code";
config.logoutUrl = config.oathServer +
    "/score/member/v1/logout?skin=haiwaigou-wap&clientId="+config.appId+"&channel=wap";
config.registerUrl = config.oathServer +
    "/score/member/v1/authorize?skin=haiwaigou-wap&clientId="+config.appId+"&channel=wap&responseType=code&startPage=register";
config.cardUrl = config.oathServer +
    "/score/member/v1/cardInfo?"

config.api = _.mapValues(api, function(v) {
    if(runtime === "develop"){
        v.url = v.baseURL["develop"]?v.baseURL["develop"] + v.uri:config.apiServer
    }else if(runtime === "test"){
        v.url = v.baseURL["test"]?v.baseURL["test"] + v.uri:config.apiServer
    }else{
        v.url = v.baseURL["develop"]?v.baseURL["develop"] + v.uri:config.apiServer
    }
    // v.url = config.apiServer + v.uri;
    return v;
});
module.exports = config;
