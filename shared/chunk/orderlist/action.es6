'use strict';
import {apiRequest} from "../../lib/util.es6";

export const REQUEST_ORDER = "REQUEST_ORDER";
export const RECEIVE_ORDER = "RECEIVE_ORDER";
export const REQUEST_DELIVERYORDER = "REQUEST_DELIVERYORDER";
export const RESPONSE_DELIVERYORDER= "RESPONSE_DELIVERYORDER";
export const REQUEST_PAYGATEWAY = "REQUEST_PAYGATEWAY";
export const RESPONSE_PAYGATEWAY = "RESPONSE_PAYGATEWAY";
export const CHANGE_ORDER= "CHANGE_ORDER";

import {alert} from "../common/action.es6";
export {alert} from "../common/action.es6";

export function changeOrder(order,status){
    return {
        type:CHANGE_ORDER,
        order,
        status
    }
}

function requestOrder(param){
    return {
        type:REQUEST_ORDER,
        param
    }
}

function receiveOrder(param,res){
    return {
        type:RECEIVE_ORDER,
        receiveAt:Date.now(),
        param,
        res
    }
}

export function fetchOrder(url,param){
    return (dispatch)=>{
        dispatch(requestOrder(param));
        return apiRequest(url,param).then((res)=>{
            dispatch(receiveOrder(param,res));
        });
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
        apiRequest("/paygateway/"+ param,{}).then((res)=>{
            dispatch(responsePayGateway(param,res))
        })
    }
}