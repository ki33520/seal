'use strict'
import {apiRequest} from "../../lib/util.es6";
import {
    RECEIVE_GOODS,REQUEST_GOODS,
    TOGGLE_CHECKED,RESET_FILTER,
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    RESPONSE_ASSOICATEWORD,REQUEST_ASSOICATEWORD
} from "./constant.es6";

function receiveGoods(params,res){
    return {
        type:RECEIVE_GOODS,
        params,
        res
    }
}

function requestGoods (params) {
    return {
        type:REQUEST_GOODS,
        params
    }
}

export function fetchGoods(params){
    return (dispath)=>{
        dispath(requestGoods(params));
        return apiRequest('/search',params).then((res)=>{
            dispath(receiveGoods(params,res))
        })
    }
}

export function toggleChecked(params){
    return {
        type:TOGGLE_CHECKED,
        params
    }
}

export function resetFilter(params){
    return {
        type:RESET_FILTER,
        params
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