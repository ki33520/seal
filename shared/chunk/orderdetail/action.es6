'use strict';
import {apiRequest} from "../../lib/util.es6";

export const CHANGE_FIELD= "CHANGE_FIELD";
export const REQUEST_SAVECOMMENT = "REQUEST_SAVECOMMENT";
export const RESPONSE_SAVECOMMENT= "RESPONSE_SAVECOMMENT";
export const REQUEST_LOGISTICS = "REQUEST_LOGISTICS";
export const RESPONSE_LOGISTICS= "RESPONSE_LOGISTICS";
export const REQUEST_ClOSEORDER = "REQUEST_ClOSEORDER";
export const RESPONSE_ClOSEORDER= "RESPONSE_ClOSEORDER";
export const REQUEST_DELIVERYORDER = "REQUEST_DELIVERYORDER";
export const RESPONSE_DELIVERYORDER= "RESPONSE_DELIVERYORDER";
export const REQUEST_PAYGATEWAY = "REQUEST_PAYGATEWAY";
export const RESPONSE_PAYGATEWAY = "RESPONSE_PAYGATEWAY";

export function changeField(name,value,key){
    return {
        type:CHANGE_FIELD,
        name,
        value,
        key
    }
}

function requestSaveComment(param){
    return {
        type:REQUEST_SAVECOMMENT,
        param
    }
}

function responseSaveComment(param,res){
    return {
        type:RESPONSE_SAVECOMMENT,
        param,
        res
    }
}

export function saveComment(url,param){
    return (dispatch)=>{
        dispatch(requestSaveComment(param));
        apiRequest(url,param,{method:"POST"}).then((res)=>{
            dispatch(responseSaveComment(param,res));
        })
    }
}

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

function requestDeliveryOrder(param){
    return {
        type:REQUEST_DELIVERYORDER,
        param
    }
}

function responseDeliveryOrder(param,res){
    return {
        type:RESPONSE_DELIVERYORDER,
        res,
        param,
        finishAt:Date.now()
    }
}

export function fetchDeliveryOrder(url,param){
    return (dispatch)=>{
        dispatch(requestDeliveryOrder(param));
        apiRequest(url,param,{method:"POST"}).then((res)=>{
            dispatch(responseDeliveryOrder(param,res));
        })
    }
}
export function fetchDeliveryOrder(url,param){
    return (dispatch)=>{
        dispatch(requestDeliveryOrder(param));
        apiRequest(url,param,{method:"POST"}).then((res)=>{
            dispatch(responseDeliveryOrder(param,res));
        })
    }
}

function requestPayGateway(param){
    return {
        type:REQUEST_PAYGATEWAY,
        param
    }
}

function responsePayGateway(param,res){
    return {
        type:RESPONSE_PAYGATEWAY,
        param,
        res,
        responseAt:Date.now()
    }
}

export function fetchPayGateway(param){
    return (dispatch)=>{
        dispatch(requestPayGateway(param))
        apiRequest("/paygateway/"+ param,(res)=>{
            dispatch(responsePayGateway(param,res))
        })
    }
}