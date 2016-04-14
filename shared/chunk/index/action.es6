'use strict';
import {apiRequest} from "../../lib/http.es6";
import {
    REQUEST_SINGLERECOMMEND,RESPONSE_SINGLERECOMMEND,
    REQUEST_NEWRECOMMEND,RESPONSE_NEWRECOMMEND,
    REQUEST_CHANNEL,RESPONSE_CHANNEL,
    REQUEST_UPDATEGOODS,RESPONSE_UPDATEGOODS
} from "./constant.es6";

import {urlPrefix} from "../../lib/jumpurl.es6";

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
        apiRequest(urlPrefix + "/channel",param).then((res)=>{
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
        apiRequest(urlPrefix + "/updategoods",param).then((res)=>{
            dispatch(responseUpdateGoods(param,res,floor,channelId))
        })
    }
}

function requestSingleRecommend(param,channelId){
    return {
        type:REQUEST_SINGLERECOMMEND,
        param,channelId
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
        dispatch(requestSingleRecommend(param,channelId));
        apiRequest(urlPrefix + "/activitygood",param).then((res)=>{
            dispatch(responseSingleRecommend(param,channelId,res));
        })
    }
}

function requestNewRecommend(param,channelId){
    return {
        type:REQUEST_NEWRECOMMEND,
        param,
        channelId
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
        dispatch(requestNewRecommend(param,channelId));
        apiRequest(urlPrefix + "/activitygood",param).then((res)=>{
            dispatch(responseNewRecommend(param,channelId,res));
        })
    }
}

export {changeField,fetchAssociateKeywords,
    fetchHotWord,fetchSearchHistory,purgeSearchHistory
} from "../common/action.es6";