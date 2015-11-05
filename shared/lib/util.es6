'use strict'
import reqwest from "reqwest";

export function apiRequest(url,param, options = {
    method:"GET",
    type:"json"
}){
    options = Object.assign({},options,{
        url,
        data:param
    });
    return reqwest(options);
}