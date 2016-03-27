'use strict';
import {apiRequest} from "../../lib/util.es6";
import {
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_SEARCHHISTORY,RESPONSE_SEARCHHISTORY,
    START_PURGE_SEARCHHISTORY,FINISH_PURGE_SEARCHHISTORY,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD,
    REQUEST_SINGLERECOMMEND,RESPONSE_SINGLERECOMMEND,
    REQUEST_NEWRECOMMEND,RESPONSE_NEWRECOMMEND,
    REQUEST_CHANNEL,RESPONSE_CHANNEL,
    REQUEST_UPDATEGOODS,RESPONSE_UPDATEGOODS
} from "./constant.es6";

function requestChannel(param){
    return {
        type:REQUEST_CHANNEL,
        param
    }
}

function responseChannel(param,res){
    return {
        type:RESPONSE_CHANNEL,
        param,
        res
    }
}

export function fetchChannel(param){
    return (dispatch)=>{
        dispatch(requestChannel(param));
        apiRequest("/channel",param).then((res)=>{
            if(res.channelFetched){
                const {newRecommend,singleRecommend} = res.result
                if(newRecommend){
                    // dispatch(fetchNewRecommend({activityId:newRecommend.id},param.id))
                }
                if(singleRecommend){
                    dispatch(fetchSingleRecommend({activityId:singleRecommend.id},param.id))
                }
            }
            dispatch(responseChannel(param,res));
        })
    }
}

function requestUpdateGoods(param){
    return {
        type:REQUEST_UPDATEGOODS,
        param
    }
}

function responseUpdateGoods(param,res,floor,channelId){
    return {
        type:RESPONSE_UPDATEGOODS,
        res,
        param,
        floor,channelId
    }
}

export function updateGoods(param,floor,channelId){
    return (dispatch)=>{
        dispatch(requestUpdateGoods(param))
        apiRequest("/updategoods",param).then((res)=>{
            dispatch(responseUpdateGoods(param,res,floor,channelId))
        })
    }
}

function requestSingleRecommend(param){
    return {
        type:REQUEST_SINGLERECOMMEND,
        param
    }
}

function responseSingleRecommend(param,channelId,res){
    return {
        type:RESPONSE_SINGLERECOMMEND,
        param,
        channelId,
        res
    }
}

export function fetchSingleRecommend(param,channelId){
    param = Object.assign({},param,{
        activityType:"ACTIVITY_TJ"
    })
    return (dispatch)=>{
        dispatch(requestSingleRecommend(param));
        apiRequest("/activitygood",param).then((res)=>{
            dispatch(responseSingleRecommend(param,channelId,res));
        })
    }
}

function requestNewRecommend(param){
    return {
        type:REQUEST_NEWRECOMMEND,
        param
    }
}

function responseNewRecommend(param,channelId,res){
    return {
        type:RESPONSE_NEWRECOMMEND,
        param,
        channelId,
        res
    }
}

export function fetchNewRecommend(param,channelId){
    param = Object.assign({},param,{
        activityType:"ACTIVITY_TJ"
    })
    return (dispatch)=>{
        dispatch(requestNewRecommend(param));
        apiRequest("/activitygood",param).then((res)=>{
            dispatch(responseNewRecommend(param,channelId,res));
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

function requestSearchHistory(param){
    return {
        type:REQUEST_SEARCHHISTORY,
        param
    }
}

function responseSearchHistory(param,res){
    return {
        type:RESPONSE_SEARCHHISTORY,
        param,
        res
    }
}

export function fetchSearchHistory(param){
    return (dispatch)=>{
        dispatch(requestSearchHistory(param));
        apiRequest("/searchhistory",param).then((res)=>{
            dispatch(responseSearchHistory(param,res));
        })
    }
}

function startPurgeSearchHistory(param){
    return {
        type:START_PURGE_SEARCHHISTORY,
        param
    }
}

function finishPurgeSearchHistory(param,res){
    return {
        type:FINISH_PURGE_SEARCHHISTORY,
        param,
        res
    }
}

export function purgeSearchHistory(param){
    return (dispatch)=>{
        dispatch(startPurgeSearchHistory(param));
        apiRequest("/purgesearchhistory",param).then((res)=>{
            dispatch(finishPurgeSearchHistory(param,res));
        })
    }
}