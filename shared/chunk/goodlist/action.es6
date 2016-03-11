'use strict'
import {apiRequest} from "../../lib/util.es6";
import {
    START_FETCH_GOODS,FINISH_FETCH_GOODS,
    START_REQUEST_GOODS,FINISH_REQUEST_GOODS,
    TOGGLE_CHECKED,RESET_FILTER,
    REQUEST_HOTWORD,RESPONSE_HOTWORD,
    RESPONSE_ASSOICATEWORD,REQUEST_ASSOICATEWORD
} from "./constant.es6";

function startFetchGoods(param){
    return {
        type:START_FETCH_GOODS,
        param
    }
}

function finishFetchGoods (param,res) {
    return {
        type:FINISH_FETCH_GOODS,
        param,
        res
    }
}
function startRequestGoods(param){
    return {
        type:START_REQUEST_GOODS,
        param
    }
}

function finishRequestGoods (param,res) {
    return {
        type:FINISH_REQUEST_GOODS,
        param,
        res
    }
}
export function fetchGoods(param){
    return (dispath)=>{
        dispath(startFetchGoods(param));
        return apiRequest('/search',param).then((res)=>{
            dispath(finishFetchGoods(param,res))
        });
    }
}

export function requestGoods(param){
    return (dispath)=>{
        dispath(startRequestGoods(param));
        return apiRequest('/search',param).then((res)=>{
            dispath(finishRequestGoods(param,res))
        });
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