'use strict';
import {apiRequest} from "../../lib/util.es6";

import {
    CHANGE_RECEIVER,CHANGE_COUPON,
    START_SUBMITORDER,FINISH_SUBMITORDER,
    REQUEST_PAYGATEWAY,RESPONSE_PAYGATEWAY,
    REQUEST_SHIPFEE,RESPONSE_SHIPFEE,
    START_VERIFYORDER,FINISH_VERIFYORDER,
    CALCULATE_TOTALFEE
} from "./constant.es6";

export function changeReceiver(checkedReceiver){
    return {
        type:CHANGE_RECEIVER,
        checkedReceiver
    }
}

export function changeCoupon(checkedCoupon){
    return {
        type:CHANGE_COUPON,
        checkedCoupon
    }
}

export function calculateTotalFee(){
    return {
        type:CALCULATE_TOTALFEE
    }
}

function startSubmitOrder(param){
    return {
        type:START_SUBMITORDER,
        param
    }
}

function finishSubmitOrder(param,res){
    return {
        type:FINISH_SUBMITORDER,
        param,
        res,
        finishAt:Date.now()
    }
}

import {alert} from "../common/action.es6";

export function submitOrder(url,param){
    return (dispatch)=>{
        dispatch(startSubmitOrder(param));
        apiRequest(url,param,{
            method:"POST"
        }).then((res)=>{
            if(res.orderSubmited){
                dispatch(alert("提交成功!",3000))
            }else{
                dispatch(alert(res.errMsg,3000))
            }
            dispatch(finishSubmitOrder(param,res));
        })
    }
}

function startVerifyOrder(param){
    return {
        type:START_VERIFYORDER,
        param
    }
}

function finishVerifyOrder(param,res){
    return {
        type:FINISH_VERIFYORDER,
        param,
        res,
        responseAt:Date.now()
    }
}

export function verifyOrder(param){
    return (dispatch)=>{
        dispatch(startVerifyOrder(param));
        apiRequest("/verifyorder",param,{method:"POST"}).then((res)=>{
            dispatch(finishVerifyOrder(param,res))
        })
    }
}


function requestShipFee(param){
    return {
        type:REQUEST_SHIPFEE,
        param
    }
}

function responseShipFee(param,res){
    return {
        type:RESPONSE_SHIPFEE,
        param,
        res,
        responseAt:Date.now()
    }
}

export function fetchShipFee(param){
    return (dispatch)=>{
        dispatch(requestShipFee(param));
        apiRequest("/shipfee",param).then((res)=>{
            dispatch(responseShipFee(param,res))
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
            if(!res.isFetched){
                dispatch(alert("获取订单信息失败!",3000))
            }
            dispatch(responsePayGateway(param,res))
        })
    }
}