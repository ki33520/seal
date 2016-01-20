'use strict'
import {apiRequest} from "../../lib/util.es6";

import {
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    REQUEST_ASSOICATEWORD,RESPONSE_ASSOICATEWORD,
    RECEIVE_GOODS,REQUEST_GOODS
} from "./constant.es6";

function receiveGoods(param,res){
    return {
        type:RECEIVE_GOODS,
        param:param,
        res:res
    }
}

function requestGoods (param) {
    return {
        type:REQUEST_GOODS,
        param:param
    }
}

export function fetchGoods(param){
    return (dispath)=>{
        dispath(requestGoods(param));
        return apiRequest("/trendyActivity",param,{method:"POST"}).then((res)=>{
            dispath(receiveGoods(param,res))
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

export {changeField} from "../common/action.es6";
