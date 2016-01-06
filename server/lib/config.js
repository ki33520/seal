'use strict'
var _ = require("lodash");
var api = require("./api.json");

var config = {
    "apiServer": "http://spi.tepin.com/mserver",
    "oathServer": "https://login.tepin.com",
    "imgServer":"http://imgtest.tepin.com/"
};
var runtime = process.env["NODE_ENV"];
if (runtime === "develop") {
    config.apiServer = "http://wsns.tepin.youayun.cn";
    config.oathServer = "https://ssl.e9448.com";
}

config.loginUrl = config.oathServer +
    "/score/member/v1/authorize?skin=tepin-wap&clientId=tepin&channel=wap";
config.logoutUrl = config.oathServer +
    "/score/member/v1/logout?skin=tepin-wap&clientId=tepin&channel=wap";
config.registerUrl = config.oathServer +
    "/score/member/v1/authorize?skin=tepin-wap&clientId=tepin&channel=wap&startPage=register";
config.cardUrl = config.oathServer +
    "/score/member/v1/cardInfo?"

config.api = _.mapValues(api, function(v) {
    if(runtime === "develop"){
        v.url = v.baseURL["develop"]?v.baseURL["develop"] + v.uri:config.apiServer
    }else{
        v.url = v.baseURL["production"]?v.baseURL["production"] + v.uri:config.apiServer
    }
    // v.url = config.apiServer + v.uri;
    return v;
});
module.exports = config;
