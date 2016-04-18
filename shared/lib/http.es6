'use strict';
import reqwest from "reqwest";

export function apiRequest(url,param={}, options = {
    method:"GET",
    type:"json"
}){
    options = Object.assign({},options,{
        url,
        data:param,
        // contentType:'application/json'
    });
    if(options.method === "POST"){
        // options["contentType"] = "application/x-www-form-urlencoded;charset=UTF8"
    }
    return reqwest(options);
}

export function urlParam(param){
    var paramStr = [];
    for(var key in param){
        paramStr.push(`${key}=${param[key]}`);
    }
    return paramStr.join("&");
}