'use strict';
import {apiRequest} from "../../lib/util.es6";
import {
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD,
    REQUEST_SINGLERECOMMEND,RESPONSE_SINGLERECOMMEND,
    REQUEST_NEWRECOMMEND,RESPONSE_NEWRECOMMEND
} from "./constant.es6";

function requestHotWord(param){
    return {
        type:REQUEST_HOTWORD,
        param
    }
}

function responseHotWord(param,res){
    return {
        type:RESPONSE_HOTWORD,
        param,
        res
    }
}

export function fetchHotWord(param){
    return (dispatch)=>{
        dispatch(requestHotWord(param));
        apiRequest("/searchhotwords",param).then((res)=>{
            dispatch(responseHotWord(param,res));
        })
    }
}

function requestSingleRecommend(param){
    return {
        type:REQUEST_SINGLERECOMMEND,
        param
    }
}

function responseSingleRecommend(param,res){
    return {
        type:RESPONSE_SINGLERECOMMEND,
        param,
        res
    }
}

export function fetchSingleRecommend(param){
    param = Object.assign({},param,{
        activityType:"ACTIVITY_DPTJ"
    })
    return (dispatch)=>{
        dispatch(requestSingleRecommend(param));
        apiRequest("/activitygood",param).then((res)=>{
            dispatch(responseSingleRecommend(param,res));
        })
    }
}

function requestNewRecommend(param){
    return {
        type:REQUEST_NEWRECOMMEND,
        param
    }
}

function responseNewRecommend(param,res){
    return {
        type:RESPONSE_NEWRECOMMEND,
        param,
        res
    }
}

export function fetchNewRecommend(param){
    param = Object.assign({},param,{
        activityType:"ACTIVITY_XPTJ"
    })
    return (dispatch)=>{
        dispatch(requestNewRecommend(param));
        apiRequest("/activitygood",param).then((res)=>{
            dispatch(responseNewRecommend(param,res));
        })
    }
}

export {changeField} from "../common/action.es6";
function requestAssociateWord(param){
    return {
        type:REQUEST_ASSOICATEWORD,
        param
    }
}

function responseAssociateWord(param,res){
    return {
        type:RESPONSE_ASSOICATEWORD,
        param,
        res
    }
}

export function fetchAssociateKeywords(param){
    return (dispatch)=>{
        dispatch(requestAssociateWord(param));
        apiRequest("/searchassociate",param,{method:"POST"}).then((res)=>{
            dispatch(responseAssociateWord(param,res));
        })
    }
}

