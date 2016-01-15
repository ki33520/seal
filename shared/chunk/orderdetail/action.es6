'use strict';
import {apiRequest} from "../../lib/util.es6";

export const REQUEST_LOGISTICS = "REQUEST_LOGISTICS";
export const RESPONSE_LOGISTICS= "RESPONSE_LOGISTICS";
export const REQUEST_ClOSEORDER = "REQUEST_ClOSEORDER";
export const RESPONSE_ClOSEORDER= "RESPONSE_ClOSEORDER";

function requestLogistics(param){
    return {
        type:REQUEST_LOGISTICS,
        param
    }
}

function responseLogistics(param,res){
    return {
        type:RESPONSE_LOGISTICS,
        param,
        res
    }
}

export function fetchLogistics(url,param){
    return (dispatch)=>{
        dispatch(requestLogistics(param));
        apiRequest(url,param).then((res)=>{
            dispatch(responseLogistics(param,res));
        })
    }
}

function requestCloseOrder(param){
    return {
        type:REQUEST_ClOSEORDER,
        param
    }
}

function responseCloseOrder(param,res){
    return {
        type:RESPONSE_ClOSEORDER,
        res,
        param,
        finishAt:Date.now()
    }
}

export function fetchCloseOrder(url,param){
    return (dispatch)=>{
        dispatch(requestCloseOrder(param));
        apiRequest(url,param,{method:"POST"}).then((res)=>{
            dispatch(responseCloseOrder(param,res));
        })
    }
}