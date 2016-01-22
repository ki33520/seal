'use strict';
import {apiRequest} from "../../lib/util.es6";

export const VERIFY_PAYPASSWORD_REQUEST = "VERIFY_PAYPASSWORD";
export const VERIFY_PAYPASSWORD_RESPONSE = "VERIFY_PAYPASSWORD";
export const START_SUBMITORDER = "START_SUBMITORDER";
export const FINISH_SUBMITORDER = "FINISH_SUBMITORDER";
export const CHANGE_RECEIVER = "CHANGE_RECEIVER";
export const CHANGE_DELIVERYTIME = "CHANGE_DELIVERYTIME"
export const CHANGE_COUPON = "CHANGE_COUPON";
export const CHANGE_INVOICE = "CHANGE_INVOICE";
export const TOGGLE_BALANCE = "TOGGLE_BALANCE";
export const TOGGLE_TICKET = "TOGGLE_TICKET";
export const CHANGE_PAYPASSWORD = "CHANGE_PAYPASSWORD";
export const REQUEST_PAYGATEWAY = "REQUEST_PAYGATEWAY";
export const RESPONSE_PAYGATEWAY = "RESPONSE_PAYGATEWAY";

export function changeReceiver(checkedReceiver){
    return {
        type:CHANGE_RECEIVER,
        checkedReceiver
    }
}

export function changeDeliveryTime(checkedDeliveryTime){
    return {
        type:CHANGE_DELIVERYTIME,
        checkedDeliveryTime
    }
}

export function changeCoupon(checkedCoupon){
    return {
        type:CHANGE_COUPON,
        checkedCoupon
    }
}
export function changeInvoice(checkedInvoice){
    return {
        type:CHANGE_INVOICE,
        checkedInvoice
    }
}

export function toggleBalance(useBalance){
    return {
        type:TOGGLE_BALANCE,
        useBalance
    }
}

export function toggleTicket(useTicket){
    return {
        type:TOGGLE_TICKET,
        useTicket
    }
}

export function changePaypassword(payPassword){
    return {
        type:CHANGE_PAYPASSWORD,
        payPassword
    }
}

function verifyPasswordRequest(param){
    return {
        type:VERIFY_PAYPASSWORD_REQUEST,
        param
    }
}

function verifyPasswordResponse(param,res){
    return {
        type:VERIFY_PAYPASSWORD_RESPONSE,
        param,
        res,
        responseAt:Date.now()
    }
}

export function verifyPassword(url,param){
    return (dispatch)=>{
        dispatch(verifyPasswordRequest(param));
        apiRequest(url,param,{
            type:"jsonp",
            jsonpCallback:"jsoncallback"
        }).then((res)=>{
            dispatch(verifyPasswordResponse(param,res));
        })
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