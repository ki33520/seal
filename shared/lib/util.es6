'use strict'
import reqwest from "reqwest";
import {base64} from "./crypto";
import _ from "lodash";
import md5 from "md5";

export function apiRequest(url,param={}, options = {
    method:"GET",
    type:"json"
}){
    options = Object.assign({},options,{
        url,
        data:param
    });
    // console.log('url',url,param)
    return reqwest(options);
}

export function base64Encode(str){
    return base64.encode(str)
}
export function base64Decode(encodedStr){
    return base64.decode(encodedStr)
}
export function base64EncodeForURL(str){
    var encodedStr = base64.encode(str);
    return encodedStr.replace(/=/g, "_").replace(/\//g, ",").replace(/\+/g, "-")
}
export function base64DecodeForURL(encodedStr){
    encodedStr = encodedStr.replace(/_/g, "=").replace(/,/g, "/").replace(/-/g, "+");
    return base64.decode(encodedStr)
}
export function urlParam(param){
    var paramStr = [];
    for(var key in param){
        paramStr.push(`${key}=${param[key]}`);
    }
    return paramStr.join("&");
}

export function getSignatureByParam(param){
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
        paramList.push("appKey=" + "0236fe7659864b1b881cb6e94709de3f")
         // console.log("paramList",paramList)
        paramList = paramList.join("&")
        return md5(paramList)
}

export function registerPullDownEvent(callback) {
    this.bindEvent(window,'scroll',()=>{
        var scrollTop = this.scrollTop();
        if (document.documentElement.clientHeight + scrollTop >= document.documentElement.scrollHeight) {
            callback();
        }
    });
}