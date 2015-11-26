'use strict';
import {apiRequest} from "../../lib/util.es6";

export const CHANGE_FIELD= "CHANGE_FIELD";
export const START_CHANGE_BASIC = "START_CHANGE_BASIC";
export const FINISH_CHANGE_BASIC = "FINISH_CHANGE_BASIC";
export const START_CHANGE_PASSWORD = "START_CHANGE_PASSWORD";
export const FINISH_CHANGE_PASSWORD= "FINISH_CHANGE_PASSWORD";
export const START_BIND_MEMBERCARD = "START_BIND_MEMBERCARD";
export const FINISH_BIND_MEMBERCARD= "FINISH_BIND_MEMBERCARD";
export const START_SEND_VERIFYCODE = "START_SEND_VERIFYCODE";
export const FINISH_SEND_VERIFYCODE= "FINISH_SEND_VERIFYCODE";

export function changeField(name,value){
    return {
        type:CHANGE_FIELD,
        name,
        value
    }
}

function startChangeBasic(param){
    return {
        type:START_CHANGE_BASIC,
        param
    }
}

function finishChangeBasic(param,res){
    return {
        type:FINISH_CHANGE_BASIC,
        res,
        param,
        finishAt:Date.now()
    }
}

export function changeBasic(url,param){
    return (dispatch)=>{
        dispatch(startChangeBasic(param));
        apiRequest(url,param,{method:"POST"}).then((res)=>{
            dispatch(finishChangeBasic(param,res));
        })
    }
}

function startChangePassword(param){
    return {
        type:START_CHANGE_PASSWORD,
        param
    }
}

function finishChangePassword(param,res){
    return {
        type:FINISH_CHANGE_PASSWORD,
        res,
        param,
        finishAt:Date.now()
    }
}

export function changePassword(url,param){
    return (dispatch)=>{
        dispatch(startChangePassword(param));
        apiRequest(url,param,{method:"POST"}).then((res)=>{
            dispatch(finishChangePassword(param,res));
        })
    }
}

function startBindMembercard(param){
    return {
        type:START_BIND_MEMBERCARD,
        param
    }
}

function finishBindMembercard(param,res){
    return {
        type:FINISH_BIND_MEMBERCARD,
        res,
        param,
        finishAt:Date.now()
    }
}

export function bindMembercard(url,param){
    return (dispatch)=>{
        dispatch(startBindMembercard(param));
        apiRequest(url,param,{
            method:"POST"
        }).then((res)=>{
            dispatch(finishBindMembercard(param,res));
        })
    }
}

function startSendVerifyCode(param){
    return {
        type:START_SEND_VERIFYCODE,
        param
    }
}

function finishSendVerifyCode(param,res){
    return {
        type:FINISH_SEND_VERIFYCODE,
        res,
        param,
        finishAt:Date.now()
    }
}

export function sendVerifyCode(url,param){
    return (dispatch)=>{
        dispatch(startSendVerifyCode(param));
        apiRequest(url,param,{
            method:"POST"
        }).then((res)=>{
            dispatch(finishSendVerifyCode(param,res));
        })
    }
}

